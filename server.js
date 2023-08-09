const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const BinarySearchTree = require("./binarySearchTree");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const bst = new BinarySearchTree();

app.get("/printtree", (req, res) => {
  const treeStructure = bst.printStructuredTree(); // Call the method
  res.json(treeStructure);
});

app.post("/add", (req, res) => {
  const value = req.body.value;
  bst.addNode(value);
  res.sendStatus(200);
});

app.delete("/delete", (req, res) => {
  const valueToDelete = parseInt(req.body.value);
  bst.deleteNode(valueToDelete);
  res.sendStatus(200);
});

app.get("/inorder", (req, res) => {
  const result = bst.inOrderTraversal();
  res.json(result);
});

app.get("/postorder", (req, res) => {
  const result = bst.postOrderTraversal();
  res.json(result);
});

app.get("/preorder", (req, res) => {
  const result = bst.preOrderTraversal();
  res.json(result);
});

app.delete("/clear", (req, res) => {
  bst.clear();
  res.sendStatus(200);
});

app.get("/find", (req, res) => {
  const value = parseInt(req.query.value);
  const result = bst.findNodeDetails(value);
  res.json(result);
});

// app.get("/find", (req, res) => {
//   const value = parseInt(req.query.value); // Use query parameter
//   const result = bst.find(value);
//   res.json(result);
// });

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
