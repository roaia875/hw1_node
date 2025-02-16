const express = require("express");
const app = express();
const port = 4000;
const path = require("path");
const products = require("./products");
const users = require("./users");
app.use(express.static(path.join(__dirname, "assets")));

// ** Route for main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "index.html"));
});

// ** Route for about page
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "about.html"));
});

// ** Route for contact page
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "assets", "contact.html"));
});

app.get("/products", (req, res) => {
  res.json(products);
});
app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.json(product);
});
app.get("/users", (req, res) => {
  const age = req.query.age;
  if (age) {
    const filteredUsers = users.filter((user) => user.age >= age);
    return res.json(filteredUsers);
  }
  res.json(users);
});
// 404 error handler
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "assets", "404.html"));
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});