const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());

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

// HTTP GET Request
app.get("/api/tools/:id", (req, res) => {
  res.send(getTool(req, res));
});

// HTTP POST Request
app.post("/api/tools", (req, res) => {
  // Validation
  const { error } = ValidateTool(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Create tool
  const tool = {
    id: req.body.id,
    name: req.body.name,
    cost: req.body.cost,
  };

  tools.push(tool);
  res.send(tool);
});

// HTTP PUT Request
app.put("/api/tools/:id", (req, res) => {
  const tool = getTool(req, res);

  // Validation
  const { error } = ValidateTool(req.body);
  if (error) res.status(400).send(error.details[0].message);

  // Update tool
  tool.id = req.body.id;
  tool.name = req.body.name;
  tool.cost = req.body.cost;
  res.send(tool);
});

// HTTP DELETE Request
app.delete("/api/tools/:id", (req, res) => {
  const tool = getTool(req, res);

  // Remove tool
  tools.splice(tools.indexOf(tool), 1);
  res.send(tool);
});

// Helper Functions

/*Get a Tool*/
function getTool(req, res) {
  const tool = tools.find((t) => t.id === parseInt(req.params.id));
  if (!tool)
    return res
      .status(404)
      .send(`The tool with ID ${req.params.id} was not found`);

  return tool;
}

/*Validate a Request*/
function ValidateTool(tool) {
  const schema = Joi.object({
    id: Joi.number().required().min(0).max(5000),
    name: Joi.string().required(),
    cost: Joi.number().required().min(0.0),
  });

  return schema.validate(tool);
}
