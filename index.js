const express = require("express");
const app = express();

// Tools
const tools = [
  { id: 7, name: "trowel", cost: 4.3 },
  { id: 3, name: "shovel", cost: 45.0 },
  { id: 4, name: "wheelbarrow", cost: 60.0 },
  { id: 2, name: "tree-spade", cost: 34999.99 },
  { id: 11, name: "gloves", cost: 4.99 },
];

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => {});

// Routes
app.get("/", (req, res) => {
  res.send(`Visit http:/localhost:${port}/api/tools to see a list of tools`);
});

app.get("/api/tools", (req, res) => {
  res.send(tools);
});
