const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(express.json());


// Base URLs for microservices
const CLIENT_SERVICE_URL = 'http://localhost:2000';
const VOITURE_SERVICE_URL = 'http://localhost:4000';

// Create a new Client
app.post('/clients', async (req, res) => {
    try {
        const response = await axios.post(`${CLIENT_SERVICE_URL}/clients`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Get all clients
app.get('/clients', async (req, res) => {
    try {
        const response = await axios.get(`${CLIENT_SERVICE_URL}/clients`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Get a single client by ID
app.get('/clients/:id', async (req, res) => {
    try {
        const response = await axios.get(`${CLIENT_SERVICE_URL}/clients/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Update a client by ID
app.patch('/clients/:id', async (req, res) => {
    try {
        const response = await axios.patch(`${CLIENT_SERVICE_URL}/clients/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Delete a client by ID
app.delete('/clients/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${CLIENT_SERVICE_URL}/clients/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Create a new Voiture
app.post('/voitures', async (req, res) => {
    try {
        const response = await axios.post(`${VOITURE_SERVICE_URL}/voitures`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Get all voitures
app.get('/voitures', async (req, res) => {
    try {
        const response = await axios.get(`${VOITURE_SERVICE_URL}/voitures`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Get a single voiture by ID
app.get('/voitures/:id', async (req, res) => {
    try {
        const response = await axios.get(`${VOITURE_SERVICE_URL}/voitures/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Update a voiture by ID
app.patch('/voitures/:id', async (req, res) => {
    try {
        const response = await axios.patch(`${VOITURE_SERVICE_URL}/voitures/${req.params.id}`, req.body);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Delete a voiture by ID
app.delete('/voitures/:id', async (req, res) => {
    try {
        const response = await axios.delete(`${VOITURE_SERVICE_URL}/voitures/${req.params.id}`);
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response.status).send(error.response.data);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
