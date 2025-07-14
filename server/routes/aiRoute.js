
import express from 'express'
// import { auth } from '../middlewares/auth.js';
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aiController.js';
import { upload } from '../config/multer.js';
import isAuthentication from '../middlewares/userAuth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article', isAuthentication, generateArticle)
aiRouter.post('/generate-blog-title', isAuthentication, generateBlogTitle)
aiRouter.post('/generate-image', isAuthentication, generateImage)
aiRouter.post('/remove-image-background', upload.single('image') ,isAuthentication, removeImageBackground)
aiRouter.post('/remove-image-object', upload.single('image'), isAuthentication, removeImageObject)
aiRouter.post('/resume-review', upload.single('resume'), isAuthentication, resumeReview)


export default aiRouter