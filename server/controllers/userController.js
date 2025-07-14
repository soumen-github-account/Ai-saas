import sql from "../config/db.js";
import userModel from "../models/userModel.js";


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

// export const toggleLikeCreations = async (req, res) => {
//   try {
//     const userId = req.id;
//     const { id } = req.body;

//     // Get the creation by ID
//     const [creation] = await sql`SELECT * FROM creations WHERE id = ${id}`;
//     if (!creation) {
//       return res.json({ success: false, message: 'Creation not found' });
//     }

//     // Ensure likes is a JS array
//     const currentLikes = creation.likes || [];
//     const userIdStr = userId.toString();

//     let updatedLikes;
//     let message;

//     // Toggle like
//     if (currentLikes.includes(userIdStr)) {
//       updatedLikes = currentLikes.filter((user) => user !== userIdStr);
//       message = 'Creation unliked';
//     } else {
//       updatedLikes = [...currentLikes, userIdStr];
//       message = 'Creation liked';
//     }

//     // Safe array insertion using postgres.js array helper
//     await sql`
//       UPDATE creations
//       SET likes = ${sql.array(updatedLikes, 'text')}
//       WHERE id = ${id}
//     `;

//     res.json({ success: true, message });
//   } catch (error) {
//     console.error("Toggle like error:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
