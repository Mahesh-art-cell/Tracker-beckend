const router = require('express').Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/auth');
const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const authMiddleware = require('../middleware/authMiddleware');

// AUTH routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

// INCOME routes
router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncomes);
router.delete('/delete-income/:id', authMiddleware, deleteIncome);

// EXPENSE routes
router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpense);
router.delete('/delete-expense/:id', authMiddleware, deleteExpense);

module.exports = router;
