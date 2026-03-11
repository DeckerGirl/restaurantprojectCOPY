const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Basic routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ========== MENU ROUTES ==========

// GET all menu items
app.get("/api/menu", async (req, res) => {
  try {
    let collection = db.collection("Menu");
    let result = await collection.find().toArray();
    res.json(result);
  } catch(e) {
    console.log(e);
  }
});

// GET a single menu item by ID
app.get("/api/menu/:id", async (req, res) => {
  try {
    let collection = db.collection("Menu");
    let result = await collection.findOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch(e) {
    console.log(e);
  }
});

// POST - add a new menu item
app.post("/api/menu", async (req, res) => {
  try {
    let collection = db.collection("Menu");
    let result = await collection.insertOne(req.body);
    res.json(result);
  } catch(e) {
    console.log(e);
  }
});

// PUT - update a menu item by ID
app.put("/api/menu/:id", async (req, res) => {
  try {
    let collection = db.collection("Menu");
    let result = await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body }
    );
    res.json(result);
  } catch(e) {
    console.log(e);
  }
});

// DELETE - remove a menu item by ID
app.delete("/api/menu/:id", async (req, res) => {
  try {
    let collection = db.collection("Menu");
    let result = await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.json(result);
  } catch(e) {
    console.log(e);
  }
});

// MongoDB connection
async function connectDB() {
  const uri = "mongodb://localhost:27017/";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    db = client.db("Restaurant");
    console.log("Connected to MongoDB!");
  } catch(error) {
    console.log(error);
  }
}

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
