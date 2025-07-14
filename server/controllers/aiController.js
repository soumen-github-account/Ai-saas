import FormData from 'form-data';
import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import pdf from 'pdf-parse/lib/pdf-parse.js'
import { GoogleGenerativeAI } from "@google/generative-ai";
import userModel from '../models/userModel.js';

// const AI = new OpenAI({
//     apiKey: process.env.GEMINI_API_KEY,
//     baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
// });

// export const generateArticle = async(req, res)=>{
//     try {
//         const userId = req.id;
//         const { prompt, length } = req.body;
//         // const plan = req.plan;
//         // const free_usage = req.free_usage;
        
//         // if(plan !== 'premium' && free_usage >= 10){
//         //     return res.json({success: false, message: "Limit reached. Upgrade to continue."})
//         // }

//         const response = await AI.chat.completions.create({
//         model: "gemini-2.0-flash",
//         messages: [
//             {
//                 role: "user",
//                 content: prompt,
//             },
//         ],
//         temperature: 0.7,
//         max_tokens: length
//     });

//     const content = response.choices[0].message.content
    
//     await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article')`;
//     // if(plan != 'premium'){
//     //     await clerkClient.users.updateUserMetadata(userId, {
//     //         privateMetadata:{
//     //             free_usage: free_usage + 1
//     //         }
//     //     })
//     // }
    
//     return res.json({success: true, content})

//     } catch (error) {
//         console.log(error.message)
//         return res.json({success: false, message: error.message})
//     }
// }

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateArticle = async (req, res) => {
  try {
    const userId = req.id; // Assume userId is injected by middleware
    const { prompt, length } = req.body;

    // const plan = req.plan;
    // const free_usage = req.free_usage;
    // if (plan !== 'premium' && free_usage >= 10) {
    //   return res.json({ success: false, message: "Limit reached. Upgrade to continue." });
    // }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: length,
      },
    });

    const content = result.response.text();

    // Save to database
    await sql`
      INSERT INTO creations (user_id, prompt, content, type)
      VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

    // Optional: Track free usage
    // if (plan !== 'premium') {
    //   await clerkClient.users.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       free_usage: free_usage + 1,
    //     },
    //   });
    // }

    return res.json({ success: true, content });

  } catch (error) {
    console.error("Generation error:", error.message || error);
    return res.json({ success: false, message: error.message || "Something went wrong" });
  }
};

export const generateBlogTitle = async(req, res)=>{
    try {
        const userId = req.id;
        const { prompt } = req.body;
        // const plan = req.plan;
        // const free_usage = req.free_usage;
        
        // if(plan !== 'premium' && free_usage >= 10){
        //     return res.json({success: false, message: "Limit reached. Upgrade to continue."})
        // }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 100,
        },
        });

        const content = result.response.text();
    
    await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title')`;
    // if(plan != 'premium'){
    //     await clerkClient.users.updateUserMetadata(userId, {
    //         privateMetadata:{
    //             free_usage: free_usage + 1
    //         }
    //     })
    // }
    
    return res.json({success: true, content})

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}


// export const generateImage = async(req, res)=>{
//     try {
//         const userId = req.id;
//         const { prompt, publish } = req.body;
//         // const plan = req.plan;
        
//         // if(plan !== 'premium'){
//         //     return res.json({success: false, message: "This features is only for subscriptions."})
//         // }

//         const formData = new FormData()
//         formData.append('prompt', prompt)
//         const {data} = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
//             headers: {'x-api-key': process.env.CLIPDROP_API_KEY ,},
//             responseType: "arraybuffer",
//         })

//         const base64Image = `data:image/png; base64, ${Buffer.from(data, 'binary').toString('base64')}`;
//         const {secure_url} = await cloudinary.uploader.upload(base64Image)
//         await sql` INSERT INTO creations (user_id, prompt, content, type, publish) VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})`;
        
//         return res.json({success: true, content: secure_url})

//     } catch (error) {
//         console.log(error.message)
//         return res.json({success: false, message: error.message})
//     }
// }
export const generateImage = async(req, res) => {
    try {
    const userId = req.id;
    const { prompt, publish } = req.body;

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (user.creditBalance <= 0) {
      return res.status(403).json({ success: false, message: 'Insufficient credits.' });
    }

    // Optional: plan check
    // const plan = req.plan;
    // if (plan !== 'premium') {
    //   return res.json({ success: false, message: "This feature is only for premium users." });
    // }

    // Build form data for ClipDrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Generate image using ClipDrop
    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );

    // Convert to Base64 for Cloudinary upload
    const base64Image = `data:image/png;base64,${Buffer.from(data, "binary").toString("base64")}`;

    // Upload to Cloudinary
    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    // Save to DB
    await sql`
      INSERT INTO creations (user_id, prompt, content, type, publish)
      VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false});
    `;

    user.creditBalance -= 1;
    await user.save();

    return res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("Image generation error:", error?.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: error?.response?.data?.error || error.message || "Something went wrong",
    });
  }
}


export const removeImageBackground = async(req, res)=>{
    try {
        const userId = req.id;
        const image = req.file;

        const user = await userModel.findById(userId);
        if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (user.creditBalance <= 0) {
        return res.status(403).json({ success: false, message: 'Insufficient credits.' });
        }
        // const plan = req.plan;
        
        // if(plan !== 'premium'){
        //     return res.json({success: false, message: "This features is only for subscriptions."})
        // }

        const {secure_url} = await cloudinary.uploader.upload(image.path,{
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        })

        await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')`;
        
        user.creditBalance -= 1;
        await user.save();


        return res.json({success: true, content: secure_url})

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}



export const removeImageObject = async(req, res)=>{
    try {
        const userId = req.id;
        const {object} = req.body;
        const image = req.file;

        const user = await userModel.findById(userId);
        if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
        }

        if (user.creditBalance <= 0) {
        return res.status(403).json({ success: false, message: 'Insufficient credits.' });
        }
        // const plan = req.plan;
        
        // if(plan !== 'premium'){
        //     return res.json({success: false, message: "This features is only for subscriptions."})
        // }

        const {public_id} = await cloudinary.uploader.upload(image.path)
        const imageUrl = cloudinary.url(public_id, {
            transformation: [{effect: `gen_remove: ${object}`}], 
            resource_type: 'image'
        })

        await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${`Remove ${object} from image`} , ${imageUrl}, 'image')`;
        
        user.creditBalance -= 1;
        await user.save();

        return res.json({success: true, content: imageUrl})

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}



export const resumeReview = async(req, res)=>{
    try {
        const userId = req.id;
        const resume = req.file;
        // const plan = req.plan;
        
        // if(plan !== 'premium'){
        //     return res.json({success: false, message: "This features is only for subscriptions."})
        // }

        if(resume.size > 5 * 1024 * 1024){
            return res.json({success: false, message:'Resume file size exceeds allowed size (5MB).'})
        }

        const dataBuffer = fs.readFileSync(resume.path)
        const pdfData = await pdf(dataBuffer)

        const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement. Resume content: \n\n${pdfData.text}`
        
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
        },
        });

        const content = result.response.text();
    
        await sql` INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, 'Review the upload resume', ${content}, 'resume-review')`;
        
        return res.json({success: true, content})

    } catch (error) {
        console.log(error.message)
        return res.json({success: false, message: error.message})
    }
}