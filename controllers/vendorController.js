const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor');

const vendorController = {};

vendorController.register = async (req,res) => {
    try
    {
        const {email,
            password,
            phone,
            GSTNumber,
            storeName,
            address,
            bankAccountNumber,
            bankName,
            ifscCode,
            accountHolder,
        } = req.body;
        const existingVendor = await Vendor.findOne({email});
        if(existingVendor)
        {
            return res.status(404).json({message: "Email already exists"})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newVendor = new Vendor({
            password:hashedPassword,
            email,
            phone,
            GSTNumber,
            storeName,
            address,
            bankAccountNumber,
            bankName,
            ifscCode,
            accountHolder,
        });
        await newVendor.save();
        return res.status(200).json({message:"Vendor Registration Successful"});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

vendorController.login = async(req,res) => {
    try{
    const {email,password} = req.body;
    const existingVendor = await Vendor.findOne({email:email});
    if(!existingVendor) return res.status(404).json({message: "User not found"});
    const validPassword = await bcrypt.compare(password,existingVendor.password);
    if(!validPassword) return res.status(404).json({message: "Incorrect password"});
    const token = jwt.sign({_id: existingVendor.vendorId},process.env.SECRET_KEY);
    return res.status(200).json({token: token,vendorId: existingVendor.vendorId});
    }catch(error)
    {
        return res.status(500).json({message: error.message});
    }
}

vendorController.getVendor = async (req,res) => {
    try
    {
        const {vendorId} = req.body;
        const vendor = await Vendor.findOne({vendorId});
        if(vendor) return res.status(200).json({vendor});
        else return res.status(404).json({message: "Invalid vendor"});
    }catch(error)
    {
        return res.status(500).json({message: error.message});
    }
}

module.exports = vendorController;