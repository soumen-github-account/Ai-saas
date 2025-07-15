import sql from "../config/db.js";
import transactionModel from "../models/transectionModel.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'

export const getUserData =async (req, res)=>{
    try{
        const userId = req.id;

        const user = await userModel.findById(userId);
        if(!user){
            return res.json({seccess:false, message:"User not found"});
        }
        res.json({success:true, userData:{ 
            id:user._id,
            name: user.name,
            email: user.email,
            balance: user.creditBalance
        }});
    } catch(error){
        res.json({success:false, message: error.message});
    }
}

export const getUserCreations = async(req, res)=>{
    try {
        const userId = req.id;

        const creations = await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC`;

        res.json({success:true, creations})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export const getPublishedCreations = async(req, res)=>{
    try {
        const creations = await sql `SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`;

        res.json({success:true, creations})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


export const toggleLikeCreations = async(req, res)=>{
    try {
        const userId = req.id;
        const {id} = req.body;
        const [creation] = await sql `SELECT * FROM creations WHERE id = ${id}`
        if(!creation){
            return res.json({success:false, message: 'creation not found'})
        }

        const currentLikes = creation.likes;
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter((user) => user !== userIdStr);
            message = 'Creation Unliked'
        } else{
            updatedLikes = [...currentLikes, userIdStr]
            message = 'Creations Liked'
        }

        const forMatedArray = `{${updatedLikes.join(',')}}`

        await sql`UPDATE CREATIONS SET likes = ${forMatedArray}::text[] WHERE id = ${id}`;

        res.json({success:true, message })
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const paymentRazorpay = async(req, res)=>{
    try {
        const userId = req.id;
        const {planId} = req.body;
        const userData = await userModel.findById(userId);
        if(!userId || !planId){
            return res.json({success: false, message: "Missing Details"})
        }

        let credits, plan, amount, date;

        switch(planId){
            case 'Premium':
                plan = 'Premium'
                credits = 500
                amount = 199
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 100
                amount = 10
                break;
            
            default:
                return res.json({success: false, message:"Plan not found"})
        }

        date = Date.now();
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        // const newTransaction = new transactionModel.create(transactionData);
        const newTransaction = await transactionModel.create(transactionData);

        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }
        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success:false, message:error})
            }

            res.json({success: true, order})
        })

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

export const verifyRazorpay = async(req, res)=>{
    try {
        const {razorpay_order_id} = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status == 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)

            if(transactionData.payment){
                return res.json({success: false, message: "Payment Failed"})
            }

            const userData = await userModel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, {creditBalance})

            await transactionModel.findByIdAndUpdate(transactionData._id, {payment: true})
            res.json({success: true, message: "Credits Added"})
        
        } else{
            res.json({success: false, message: "Payment Failed"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}