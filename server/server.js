import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
// import { ClerkExpressWithAuth } from '@clerk/express';
import aiRouter from './routes/aiRoute.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import connectDB from './config/mongodb.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser'

const app = express()
// app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173',  // your React app's URL
  credentials: true
}));

connectDB();
connectCloudinary();
// app.use(clerkMiddleware())
// const allowedOrigins = [
//   'http://localhost:5173'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

app.get('/', (req,res)=>res.send('Server is live'))

// app.use(requireAuth())
// app.use(ClerkExpressWithAuth());


app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)
app.use('/api/auth', authRouter)
const PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log("server started on port : ",PORT)
})