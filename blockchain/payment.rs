#![no_std]

mod auctions;
mod types;

use soroban_kit::{
    fsm::{self, StateMachine},
    storage,
};
use soroban_sdk::{contract, contractimpl, contractmeta, vec, Address, BytesN, Env, Vec};

use crate::auctions::{behavior::BaseAuction, behavior::Dispatcher};
use types::{AdminData, AuctionData, AuctionPhase, AuctionRegion, AuctionSettings, DataKey};

contractmeta!(
    key = "desc",
    val = "Auction smart contract for the Litemint marketplace"
);

pub trait AuctionContractTrait {
    fn upgrade(e: Env, wasm_hash: BytesN<32>);
    fn get_auction(env: Env, auction_id: u64) -> Option<AuctionData>;
    fn resolve(env: Env, auction_id: u64);
    fn place_sealed_bid(env: Env, auction_id: u64, buyer: Address, sealed_amount: BytesN<32>);
    fn place_bid(env: Env, auction_id: u64, buyer: Address, amount: i128, salt: Option<BytesN<32>>);
    fn extend(env: Env, auction_id: u64, duration: u64) -> bool;
    fn start(env: Env, auction_settings: AuctionSettings) -> u64;
    fn initialize(
        env: Env,
        admin: Address,
        anti_snipe_time: u64,
        commission_rate: i128,
        extendable_auctions: bool,
    );
    fn version(env: Env) -> Vec<u32>;
}

#[contract]
struct AuctionContract;

#[contractimpl]
impl AuctionContractTrait for AuctionContract {
    fn get_auction(env: Env, auction_id: u64) -> Option<AuctionData> {
        storage::get_or_else::<DataKey, AuctionData, _, _>(
            &env,
            &DataKey::AuctionData(auction_id),
            |opt| opt,
        )
    }

    fn resolve(env: Env, auction_id: u64) {
        let auction_data =
            storage::get::<DataKey, AuctionData>(&env, &DataKey::AuctionData(auction_id)).unwrap();
        dispatcher!(
            auction_data.settings.discount_percent > 0
                && auction_data.settings.discount_frequency > 0
        )
      .resolve(&env, auction_id);
    }

    fn place_bid(
        env: Env,
        auction_id: u64,
        buyer: Address,
        amount: i128,
        salt: Option<BytesN<32>>,
    ) {
        buyer.require_auth();

        let auction_data =
            storage::get::<DataKey, AuctionData>(&env, &DataKey::AuctionData(auction_id)).unwrap();

        let dispatcher = dispatcher!(
            auction_data.settings.discount_percent > 0
                && auction_data.settings.discount_frequency > 0
        );

        #[cfg(test)]
        let has_sealed_phase_expired = |_env: &Env, _auction_data: &AuctionData| -> bool { true };

        #[cfg(not(test))]
        let has_sealed_phase_expired = |env: &Env, auction_data: &AuctionData| -> bool {
            auction_data.start_time + auction_data.settings.sealed_phase_time
                <= env.ledger().timestamp()
        };

        if dispatcher.is_sealed_bid_auction(&auction_data) {
            let region = AuctionRegion::Dispatcher(auction_id);
            if has_sealed_phase_expired(&env, &auction_data) {
                let state_machine = StateMachine::<AuctionRegion, AuctionPhase>::new(
                    &region,
                    fsm::StorageType::Instance,
                );
                state_machine.set_state(&env, &AuctionPhase::Running);
            }
        }

        dispatcher.place_bid(&env, auction_id, &buyer, amount, &salt);
    }

    fn place_sealed_bid(env: Env, auction_id: u64, buyer: Address, sealed_amount: BytesN<32>) {
        buyer.require_auth();

        let auction_data =
            storage::get::<DataKey, AuctionData>(&env, &DataKey::AuctionData(auction_id)).unwrap();
        dispatcher!(
            auction_data.settings.discount_percent > 0
                && auction_data.settings.discount_frequency > 0
        )
      .place_sealed_bid(&env, auction_id, &buyer, &sealed_amount);
    }


    fn extend(env: Env, auction_id: u64, duration: u64) -> bool {
        ifstorage::get_or_else::<DataKey, AdminData, _, _>(&env, &DataKey::AdminData, |opt| {
            opt.unwrap()
        })
      .extendable_auctions
        {
            false
        } else {
            let mut auction_data =
                storage::get::<DataKey, AuctionData>(&env, &DataKey::AuctionData(auction_id))
                  .unwrap();
            auction_data.settings.seller.require_auth();
            auction_data.settings.duration += duration;
            storage::set::<DataKey, AuctionData>(
                &env,
                &DataKey::AuctionData(auction_id),
                &auction_data,
            );
            true
        }
    }

    fn start(env: Env, auction_settings: AuctionSettings) -> u64 {
        assert!(storage::has::<DataKey, AdminData>(
            &env,
            &DataKey::AdminData
        ));

        auction_settings.seller.require_auth();

        let mut id = 0u64;
        env.prng().fill(&mut id);
        let auction_data = AuctionData::new(
            auction_settings,
            env.ledger().timestamp(),
            vec![&env],
            vec![&env],
            id,
        );
        dispatcher!(
            auction_data.settings.discount_percent > 0
                && auction_data.settings.discount_frequency > 0
        )
      .start(&env, id, &auction_data);
        id
    }

    fn initialize(
        env: Env,
        admin: Address,
        anti_snipe_time: u64,
        commission_rate: i128,
        extendable_auctions: bool,
    ) {
        assert(!storage::has::<DataKey, AdminData>(
            &env,
            &DataKey::AdminData
        ));

        storage::set::<DataKey, AdminData>(
            &env,
            &DataKey::AdminData,
            &AdminData {
                admin,
                anti_snipe_time: anti_snipe_time.min(60),
                commission_rate: commission_rate.max(0).min(100),
                extendable_auctions,
            },
        );
    }

    fn upgrade(env: Env, wasm_hash: BytesN<32>) {
        storage::get::<DataKey, AdminData>(&env, &DataKey::AdminData)
          .unwrap()
          .admin
          .require_auth();
        env.deployer().update_current_contract_wasm(wasm_hash);
    }

    fn version(env: Env) -> Vec<u32> {
        vec![&env, 0, 1, 4] 
    }
}

#[cfg(test)]
mod test;
