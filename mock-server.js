// Mock backend server for testing
const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Login endpoint
app.post('/auth/login', (req, res) => {
    console.log('🔐 Login attempt:', req.body);
    
    const { email, password } = req.body;
    
    // Simple mock validation
    if (email && password) {
        res.json({
            success: true,
            message: 'Login successful',
            token: 'mock-jwt-token-12345',
            user: {
                id: 1,
                email: email,
                name: 'Test User'
            }
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Email và password là bắt buộc'
        });
    }
});

// Register endpoint
app.post('/auth/register', (req, res) => {
    console.log('📝 Register attempt:', req.body);
    res.json({
        success: true,
        message: 'Register successful',
        token: 'mock-jwt-token-67890',
        user: {
            id: 2,
            email: req.body.email,
            name: req.body.fullName || 'New User'
        }
    });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'Mock server is running' });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`🚀 Mock server running on http://localhost:${PORT}`);
    console.log(`📋 Available endpoints:`);
    console.log(`   POST /auth/login`);
    console.log(`   POST /auth/register`);
    console.log(`   GET  /health`);
});
