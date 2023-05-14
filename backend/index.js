const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(express.json());

const uri = 'mongodb://localhost:27017/employeeDB';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

app.post('/employees', async (req, res) => {
  try {
    await client.connect();
    const db = client.db('employeeDB');
    const collection = db.collection('employees');

    const employee = req.body;
    const result = await collection.insertOne(employee);
    res.send(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating employee');
  } finally {
    await client.close();
  }
});

app.put('/employees/:id', async (req, res) => {
  const db = client.db('employeeDB');
  const collection = db.collection('employees');

  try {
    const { id } = req.params;
    const employee = req.body;
    const result = await collection.updateOne(
      { _id: ObjectId(id) },
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

app.delete('/employees/:id', async (req, res) => {
  const db = client.db('employeeDB');
  const collection = db.collection('employees');

  try {
    const { id } = req.params;
    const result = await collection.deleteOne({ _id: ObjectId(id) });
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
