import React from 'react';
import RecommendSection from '../components/RecommendSection';
import ApparelSection from '../components/ApparelSection';
import ElectronicSection from '../components/ElectronicSection';
import BookSection from '../components/BookSection';
import GrocerySection from '../components/GrocerySection';
import HomeCarousel from './crousal/HomeCarousel';
import { Grid } from '@material-ui/core';

const Home = ({setLoader}) => {
    return (
        <div className='productCardContainer'>
            <HomeCarousel />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <RecommendSection setLoader={setLoader} />
                </Grid>
                <Grid item xs={12}>
                    <BookSection setLoader={setLoader} />
                </Grid>
                <Grid item xs={12}>
                    <ApparelSection setLoader={setLoader} />
                </Grid>
                <Grid item xs={12}>
                    <ElectronicSection setLoader={setLoader} />
                </Grid>
                <Grid item xs={12}>
                    <GrocerySection setLoader={setLoader} />
                </Grid>
            </Grid>
        </div>
    )
}

export default Home;