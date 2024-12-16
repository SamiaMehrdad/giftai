const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const createStripeCustomer = async (email) => {
    const customer = await stripe.customers.create({ email });
    return customer.id;
};

module.exports = { createStripeCustomer };
