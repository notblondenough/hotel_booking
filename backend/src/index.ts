import express,{Request,Response} from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from './routes/users'
import authRoutes from './routes/auth'
import cookieParser from "cookie-parser";
import path from "path";

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

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});