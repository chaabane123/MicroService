const express = require('express');
const mongoose = require('mongoose');
const Client = require('./models/client'); // Import the Client model
const bodyParser = require('body-parser');

const app = express();
const PORT = 2000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/micro', {
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Create a new Client
app.post('/clients', async (req, res) => {
    const { name, email, age } = req.body;
   
    try {
        const client = new Client({ name, email, age });
        await client.save();
        res.status(201).send(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all clients
app.get('/clients', async (req, res) => {
    try {
        const clients = await Client.find();
        res.send(clients);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single client by ID
app.get('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a client by ID
app.patch('/clients/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a client by ID
app.delete('/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).send();
        }
        res.send(client);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
