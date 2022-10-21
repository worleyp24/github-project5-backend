const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

const productsRouter = require("./routes/products");
const cartItemsRouter = require("./routes/cartItems");

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());

app.use("/Menu", productsRouter);
app.use("/Cart", cartItemsRouter);

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
