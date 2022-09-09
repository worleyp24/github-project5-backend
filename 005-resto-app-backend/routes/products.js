const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
// const { v4: uuidv4 } = require("uuid");

const productFile = "./products.json";
const productFilePath = path.resolve(__dirname, productFile);

router.get("/*", (request, response) => {
  const productList = fs.readFileSync(productFilePath);
  response.send(productList);
});

// Route for creating a new item
router.post("/*", (request, response) => {
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
  fs.writeFileSync(productFilePath, JSON.stringify(productList));
  response.status(201).send();
});

// Route for deleting an item
router.delete("/:id", (request, response) => {
  const productList = JSON.parse(fs.readFileSync(productFilePath));
  const updatedProductList = productList.filter(
    (item) => item.id != request.params.id
  );
  fs.writeFileSync(productFilePath, JSON.stringify(updatedProductList));
  response.status(200).send();
});

// router.put("/*", (request, response) => {
//   console.log(request.body);
//   // const productList = JSON.parse(fs.readFileSync(productFilePath));
//   // const productList = request.body;
//   // const productList = [...request.body];

//   fs.writeFileSync(productFilePath, JSON.stringify(request.body));
//   response.status(200).send();
// });

// Route for editing an item
router.put("/:id", (request, response) => {
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

  fs.writeFileSync(productFilePath, JSON.stringify(productList));
  response.status(200).send();
});

module.exports = router;
