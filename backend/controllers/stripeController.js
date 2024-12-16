const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User");

const createCheckoutSession = asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "subscription",
        line_items: [
            {
                price: "your_price_id_here",
                quantity: 1,
            },
        ],
        success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
});

const handleWebhook = asyncHandler(async (req, res) => {
    const payload = req.rawBody;
    const sig = req.headers["stripe-signature"];

    try {
        const event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);

        if (event.type === "checkout.session.completed") {
            const session = event.data.object;
            const customer = session.customer;
            const user = await User.findOne({ stripeCustomerId: customer });
            if (user) {
                user.tokens += 500; // Add tokens on subscription
                await user.save();
            }
        }

        res.json({ received: true });
    } catch (err) {
        console.error(`Webhook error: ${err.message}`);
        res.status(400).send(`Webhook error: ${err.message}`);
    }
});

module.exports = { createCheckoutSession, handleWebhook };
