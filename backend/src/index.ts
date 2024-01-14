import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from "cookie-parser";
import path from "path";
import {v2 as cloudinary} from "cloudinary";
import myHotelsRoutes from './routes/my-hotels'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app=express();
app.use(cookieParser());
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors(
    {
        origin:process.env.FRONTEND_URL as string,
        credentials:true
    }
));

app.use(express.static(path.join(__dirname,"../../frontend/dist")));
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/my-hotels',myHotelsRoutes);

app.use('*',(req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,"../../frontend/dist/index.html"));
}
)
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});