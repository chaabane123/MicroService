const express = require('express');
const mongoose = require('mongoose');
const Voiture = require('./models/voiture'); // Import the Voiture model
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/micro', {
   
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(error => {
    console.error('Error connecting to MongoDB:', error);
});

// Create a new Voiture
app.post('/voitures', async (req, res) => {
    const {Marque,Serie}= req.body
    if (Marque==""||Serie==""){

        return res.status(401).json({error:"msldkfjsmdlj"})
    }
    try {
        const voiture = new Voiture({Marque,Serie});
        await voiture.save();
        res.status(201).send(voiture);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all voitures
app.get('/voitures', async (req, res) => {
    try {
        const voitures = await Voiture.find();
        res.send(voitures);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get a single voiture by ID
app.get('/voitures/:id', async (req, res) => {
    try {
        const voiture = await Voiture.findById(req.params.id);
        if (!voiture) {
            return res.status(404).send();
        }
        res.send(voiture);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a voiture by ID
app.patch('/voitures/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['marque', 'serie'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const voiture = await Voiture.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!voiture) {
            return res.status(404).send();
        }
        res.send(voiture);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a voiture by ID
app.delete('/voitures/:id', async (req, res) => {
    try {
        const voiture = await Voiture.findByIdAndDelete(req.params.id);
        if (!voiture) {
            return res.status(404).send();
        }
        res.send(voiture);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
