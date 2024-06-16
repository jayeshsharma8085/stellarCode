const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const userController = {};

userController.register = async (req,res) => {
    try{
        const {name,email,password} = req.body;
        const existingUser = await User.findOne({email: email});
        if(existingUser) return res.status(400).json({message: "Email already exists"});
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({name,email,password:hashedPassword});
        await newUser.save();
        return res.status(200).json({message:"User registration successful"});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

userController.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message: "Email does not exists"});
        const validPassword = await bcrypt.compare(password,existingUser.password);
        if(!validPassword) return res.status(404).json({message: "Incorrect password"});
        const token = jwt.sign({_id : existingUser._id},process.env.SECRET_KEY);
        return res.status(200).json({token,userId: existingUser.userId});
    }catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});       
    }
}

userController.addToCart = async (req, res) => {
    const { productId, quantity, userId } = req.body;
    try {
        let user = await User.findOne({ userId: userId }).populate('cart.product');
        if (user) {
            console.log(productId)
            const existingProductIndex = user.cart.findIndex(item => item.productId === productId)
        
            if (existingProductIndex !== -1) {
                user.cart[existingProductIndex].qty += quantity;
            } else {
                user.cart.push({ product: productId, qty: quantity });
            }
            await user.save();
            return res.status(200).json({ message: "Product added to cart successfully", cart: user.cart });
        } else {
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

userController.getCart = async (req,res) => {
    const userId = req.body.userId;
    const data = await User.findOne({
        userId: userId
    });
    console.log(data.cart);
    return res.status(200).json(data.cart);
}

module.exports = userController;