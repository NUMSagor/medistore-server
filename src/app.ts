import express, { Application } from "express";
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";


const app:Application = express();

app.use(cors({
   origin:process.env.APP_URL || "http://localhost:4000",
   credentials:true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes)




export default app;