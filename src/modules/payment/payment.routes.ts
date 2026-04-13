import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { Role } from "../../generated/prisma";
import Stripe from "stripe";

const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

router.post("/create-payment-intent", authMiddleware([Role.CUSTOMER]), async (req, res) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // cents এ convert
            currency: "usd",
        });

        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

export const paymentRoutes = router;