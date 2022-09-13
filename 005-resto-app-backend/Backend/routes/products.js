const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const productFile = "./products.json";
const productFilePath = path.resolve(__dirname, productFile);

router.get("/*", (request, response) => {
  try {
    const productList = fs.readFileSync(productFilePath);
    response.send(productList);
  } catch (err) {
    response.send(err.message);
  }
});

// Route for creating a new item
router.post("/*", (request, response) => {
  try {
    const productList = JSON.parse(fs.readFileSync(productFilePath));

    const newItem = {
      id: request.body.id,
      discount: request.body.discount,
      image: request.body.image,
      name: request.body.name,
      category: request.body.category,
      price: request.body.price,
      description: request.body.description,
    };

    productList.push(newItem);
    fs.writeFileSync(productFilePath, JSON.stringify(productList, null, 2));
    response.status(201).send();
  } catch (err) {
    response.send(err.message);
  }
});

// Route for deleting an item
router.delete("/:id", (request, response) => {
  try {
    const productList = JSON.parse(fs.readFileSync(productFilePath));
    const updatedProductList = productList.filter(
      (item) => item.id != request.params.id
    );
    fs.writeFileSync(
      productFilePath,
      JSON.stringify(updatedProductList, null, 2)
    );
    response.status(200).send();
  } catch (err) {
    response.send(err.message);
  }
});

// Route for editing an item
router.put("/:id", (request, response) => {
  try {
    const productList = JSON.parse(fs.readFileSync(productFilePath));

    const indexOfItem = productList.findIndex(
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
    };

    productList.splice(indexOfItem, 1, editItem);

    fs.writeFileSync(productFilePath, JSON.stringify(productList, null, 2));
    response.status(200).send();
  } catch (err) {
    response.send(err.message);
  }
});

module.exports = router;
