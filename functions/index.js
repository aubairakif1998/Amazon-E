const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51NBlAwHgnzHIdfZgDGJ1EBJ29QPZvJoWZEB9rAqKY7WU76WcpopasteNpPwXzYcFVkzWTkDa56iTfdl8XsXswPW700XJO25hWK"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

exports.api = functions.https.onRequest(app);
