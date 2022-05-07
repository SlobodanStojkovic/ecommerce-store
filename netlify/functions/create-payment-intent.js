require("dotenv").config();
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body); // here the valuew we recieve if it is 10000 that is 100, it always multiply with 100, because doesn't have comma for 100,00

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });

    return {
      status: 400,
      body: JSON.stringify({ error }),
    };
  }
};
