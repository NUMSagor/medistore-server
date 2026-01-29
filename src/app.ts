import express, { Application } from "express";
import cors from "cors"
import { authRoutes } from "./modules/auth/auth.routes";
import { userRoutes } from "./modules/user/user.routes";
import { medicineRoutes } from "./modules/medecine/medicine.routes";
import { categoryRoutes } from "./modules/category/category.routes";
import { orderRoutes } from "./modules/order/order.routes";
import { reviewRoutes } from "./modules/review/review.routes";


const app: Application = express();

app.use(cors({
   origin: process.env.APP_URL || "http://localhost:4000",
   credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/auth", authRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/seller/medicines", medicineRoutes);

app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);





export default app;