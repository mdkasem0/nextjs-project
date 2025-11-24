const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let products = [];

// GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// GET product by ID
app.get("/products/:id", (req, res) => {
  const item = products.find((p) => p.id == req.params.id);
  res.json(item || {});
});

// ADD product
app.post("/add-product", (req, res) => {
  const newProduct = {
    id: Date.now(),
    ...req.body
  };

  products.push(newProduct);
  res.json({ success: true, product: newProduct });
});

// DELETE product
app.delete("/products/:id", (req, res) => {
  products = products.filter((p) => p.id != req.params.id);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
