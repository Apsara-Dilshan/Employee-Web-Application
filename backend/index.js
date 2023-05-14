// Import required modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// Create express app
const app = express();
const port = 5000;

// Use cors and json middleware
app.use(cors());
app.use(express.json());

// Set up MongoDB client
const uri = 'mongodb://localhost:27017/employeeDB';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define GET route for fetching all employees
app.get('/employees', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('employeeDB');
    const collection = db.collection('employees');
    const employees = await collection.find().toArray();
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  } finally {
    await client.close();
  }
});

// Define POST route for creating a new employee
app.post('/employees', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('employeeDB');
    const collection = db.collection('employees');

    const employee = req.body;
    const result = await collection.insertOne(employee);
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating employee');
  } finally {
    await client.close();
  }
});
// const PAGE_SIZE = 5;

// Define PUT route for updating an employee
app.put('/employees/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('employeeDB');
    const collection = db.collection('employees');
    const { id } = req.params;
    const employee = req.body;
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: employee }
    );
    if (result.matchedCount === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.send('Employee updated successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating employee');
  }
});

// Define DELETE route for deleting an employee
app.delete('/employees/:id', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('employeeDB');
    const collection = db.collection('employees');
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      res.status(404).send('Employee not found');
    } else {
      res.send('Employee deleted successfully');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting employee');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
