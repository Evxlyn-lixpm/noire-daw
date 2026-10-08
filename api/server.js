const express = require("express");
const cors = require("cors");

const products = require("./data/products");
const categories = require("./data/categories");
const customers = require("./data/customers");
const orders = require("./data/orders");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "NOIRÉ API",
    message: "API REST de la tienda de moda NOIRÉ",
    version: "1.0.0",
    endpoints: [
      "/api/products",
      "/api/categories",
      "/api/customers",
      "/api/orders"
    ]
  });
});

app.get("/api/products", (req, res) => {
  let result = [...products];
  const { category, search, maxPrice } = req.query;

  if (category) {
    result = result.filter(
      product => product.categoryId === Number(category)
    );
  }

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  }

  if (maxPrice) {
    result = result.filter(product => product.price <= Number(maxPrice));
  }

  res.json(result);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }

  res.json(product);
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint no encontrado" });
});

app.listen(PORT, () => {
  console.log(`NOIRÉ API ejecutándose en http://localhost:${PORT}`);
});