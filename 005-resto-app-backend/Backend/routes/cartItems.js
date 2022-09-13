const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const cartItemFile = "./cartItems.json";
const cartItemFilePath = path.resolve(__dirname, cartItemFile);

router.get("/*", (request, response) => {
  try {
    const cartItemList = fs.readFileSync(cartItemFilePath);
    response.send(cartItemList);
  } catch (err) {
    response.send(err.message);
  }
});

// Route for creating a new item
router.post("/*", (request, response) => {
  try {
    const cartItemList = JSON.parse(fs.readFileSync(cartItemFilePath));

    const updatedCartItemList = [...request.body];

    fs.writeFileSync(
      cartItemFilePath,
      JSON.stringify(updatedCartItemList, null, 2)
    );
    response.status(201).send();
  } catch (err) {
    response.send(err.message);
  }
});

// Route for deleting an item
router.delete("/:id", (request, response) => {
  console.log(request.params.id);
  try {
    const cartItemList = JSON.parse(fs.readFileSync(cartItemFilePath));
    const updatedCartItemList = cartItemList.filter(
      (item) => item.id != request.params.id
    );
    fs.writeFileSync(
      cartItemFilePath,
      JSON.stringify(updatedCartItemList, null, 2)
    );
    response.status(200).send();
  } catch (err) {
    response.send(err.message);
  }
});

// Route for editing an item
router.put("/:id", (request, response) => {
  try {
    const cartItemList = JSON.parse(fs.readFileSync(cartItemFilePath));

    const indexOfItem = cartItemList.findIndex(
      (item) => item.id == request.params.id
    );

    const editItem = {
      id: request.body.id,
      discount: request.body.discount,
      image: request.body.image,
      name: request.body.name,
      category: request.body.category,
      price: request.body.price,
      description: request.body.description,
      quantity: request.body.quantity,
    };

    cartItemList.splice(indexOfItem, 1, editItem);

    fs.writeFileSync(cartItemFilePath, JSON.stringify(cartItemList, null, 2));
    response.status(200).send();
  } catch (err) {
    response.send(err.message);
  }
});

module.exports = router;
