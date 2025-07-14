// // Middleware to check userId and hasPremium

import { clerkClient } from "@clerk/express";

export const auth = async(req, res, next)=>{
    try {
        const {userId, has} = await req.auth();
        const hasPremiumPlan = await has({plan: 'premium'});
        console.log('✅ Clerk-auth resolved userId:', userId);
        const user = await clerkClient.users.getUser(userId);
        if(!hasPremiumPlan && user.privateMetadata.free_usage){
            req.free_usage = user.privateMetadata.free_usage;
        } else{
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata:{
                    free_usage: 0
                }
            })
            req.free_usage = 0;
        }
        req.plan = hasPremiumPlan ? 'premium' : 'free';
        next()
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}


// import { clerkClient } from "@clerk/express";

// export const auth = async (req, res, next) => {
//   try {
//     console.log('🚀 Incoming Authorization header:', req.headers.authorization);

//     const { userId } = await req.auth?.();  // ✅ CALL THE FUNCTION

//     console.log('✅ Clerk-auth resolved userId:', userId);

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Unauthorized: A valid user ID is required."
//       });
//     }

//     const user = await clerkClient.users.getUser(userId);

//     const hasPremiumPlan = user.privateMetadata?.plan === "premium";

//     if (!hasPremiumPlan && user.privateMetadata.free_usage != null) {
//       req.free_usage = user.privateMetadata.free_usage;
//     } else {
//       await clerkClient.users.updateUserMetadata(userId, {
//         privateMetadata: {
//           free_usage: 0
//         }
//       });
//       req.free_usage = 0;
//     }

//     req.plan = hasPremiumPlan ? "premium" : "free";
//     req.userId = userId;
//     next();
//   } catch (error) {
//     console.error("💥 Middleware error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

