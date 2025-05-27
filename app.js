const express = require('express');
const cors = require('cors');
const db = require('./db/db.js');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "https://tracker-fontend-p2e7.vercel.app/"
}));

// ADD THIS: Root route to fix "Cannot GET /" error
app.get('/', (req, res) => {
    res.json({
        message: '🚀 Expense Tracker API is running successfully!',
        version: '1.0.0',
        status: 'Active',
        endpoints: {
            base_url: `/api/v1`,
            auth: {
                register: 'POST /api/v1/register',
                login: 'POST /api/v1/login',
                profile: 'GET /api/v1/profile'
            },
            income: {
                add: 'POST /api/v1/add-income',
                get: 'GET /api/v1/get-incomes',
                delete: 'DELETE /api/v1/delete-income/:id'
            },
            expense: {
                add: 'POST /api/v1/add-expense',
                get: 'GET /api/v1/get-expenses',
                delete: 'DELETE /api/v1/delete-expense/:id'
            }
        }
    });
});

// Routes - Your existing dynamic route loading
readdirSync('./routes').map((route) => app.use('/api/v1', require(`./routes/${route}`)));

// ADD THIS: 404 handler for undefined routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
        suggestion: 'Check the root endpoint / for available routes'
    });
});

// ADD THIS: Global error handler
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

const server = async () => {
    try {
        await db(); // Ensure DB is connected before starting
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📚 API Documentation: http://localhost:${PORT}/`);
            console.log(`🔗 Base URL: http://localhost:${PORT}/api/v1`);
        });
    } catch (error) {
        console.error('❌ Server failed to start:', error.message);
        process.exit(1);
    }
};

server();




// require('dotenv').config();
// const express = require("express");
// const cors = require("cors");
// const connectDB = require('./db/db');

// const authRoutes = require("./routes/auth"); // if separated
// const apiRoutes = require("./routes/api");   // all in one

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors());
// app.use(express.json());

// connectDB(); // MongoDB connection

// // Routes
// app.use("/api/v1", apiRoutes);

// // Default route
// app.get("/", (req, res) => {
//   res.send("🚀 Expense Tracker API");
// });

// // Start server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
