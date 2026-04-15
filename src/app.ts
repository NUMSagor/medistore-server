// import express, { Application } from "express";

// import cors from "cors";
// import { authRoutes } from "./modules/auth/auth.routes";
// import { userRoutes } from "./modules/user/user.routes";
// import { medicineRoutes } from "./modules/medecine/medicine.routes";
// import { categoryRoutes } from "./modules/category/category.routes";
// import { orderRoutes } from "./modules/order/order.routes";
// import { reviewRoutes } from "./modules/review/review.routes";
// import { paymentRoutes } from "./modules/payment/payment.routes";
// import { toNodeHandler } from "better-auth/node";
// import { auth } from "./lib/auth";

// const app: Application = express();


// const allowedOrigins = [
//   process.env.APP_URL || "http://localhost:3000",
//   process.env.NEXT_PUBLIC_API_URL || "https://client-medistore.vercel.app"
// ];

// app.use(cors({
//   origin:allowedOrigins,
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));


// app.all("/api/auth/*splat", toNodeHandler(auth));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.json({ message: "Medistore API is running!" });
// });

// app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api/seller/medicines", medicineRoutes);
// app.use("/api/categories", categoryRoutes);
// app.use("/api/orders", orderRoutes);
// app.use("/api/reviews", reviewRoutes);

// app.use("/api/payment", paymentRoutes);

// export default app;




import express, { Application } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.routes.js";
import { userRoutes } from "./modules/user/user.routes.js";
import { medicineRoutes } from "./modules/medecine/medicine.routes.js";
import { categoryRoutes } from "./modules/category/category.routes.js";
import { orderRoutes } from "./modules/order/order.routes.js";
import { reviewRoutes } from "./modules/review/review.routes.js";
import { paymentRoutes } from "./modules/payment/payment.routes.js";
import { toNodeHandler } from "better-auth/node";


const app: Application = express();

const allowedOrigins = [
  process.env.APP_URL || "http://localhost:3000",
  process.env.CLIENT_URL || "https://client-medistore.vercel.app", 
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));




app.all("/api/auth/*splat", async (req, res) => {
  const { toNodeHandler } = await import("better-auth/node");
  const { getAuth } = await import("./lib/auth.js");
  const auth = await getAuth();
  return toNodeHandler(auth)(req, res);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Medistore API is running!" });
});

app.use("/api/v1/jwt-auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/seller/medicines", medicineRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/payment", paymentRoutes);

export default app;