
import express from 'express'
import { login, logout, register } from '../controllers/authController.js';



const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
// authRouter.post('/send-verify-otp', userAuth, sendVerifyOtp);
// authRouter.post('/verify-account', userAuth, verifyemail);
// authRouter.get('/is-auth', userAuth, isAuthanticated);
// authRouter.post('/send-reset-otp', sendResetOtp);
// authRouter.post('/reset-password', restePassword);


export default authRouter;