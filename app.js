const express = require('express');
const cors = require('cors');
const db = require('./db/db.js');
const { readdirSync } = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
// app.use(cors({
//     origin: "https://tracker-fontend.vercel.app"
// }));


const allowedOrigins = [
    // 'https://tracker-fontend.vercel.app',
    'http://localhost:3000'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log('❌ Blocked by CORS:', origin); // <- Debugging
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
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

