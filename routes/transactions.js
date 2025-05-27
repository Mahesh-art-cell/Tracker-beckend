// const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
// const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
// const { registerUser, loginUser, getUserProfile } = require('../controllers/auth'); // ADD THIS
// const authMiddleware = require('../middleware/authMiddleware');
// const router = require('express').Router();

// // ============================
// // AUTHENTICATION ROUTES (Public)
// // ============================
// const express = require('express');

// router.post('/register', registerUser);
// router.post('/login', loginUser);
// router.get('/profile', authMiddleware, getUserProfile);



// // ============================
// // INCOME ROUTES (Protected)
// // ============================
// router.post('/add-income', authMiddleware, addIncome);
// router.get('/get-incomes', authMiddleware, getIncomes);
// router.delete('/delete-income/:id', authMiddleware, deleteIncome);



// // ============================
// // EXPENSE ROUTES (Protected)
// // ============================
// router.post('/add-expense', authMiddleware, addExpense);
// router.get('/get-expenses', authMiddleware, getExpense);
// router.delete('/delete-expense/:id', authMiddleware, deleteExpense);

// module.exports = router;


const express = require('express');
const router = express.Router();

const {
  addExpense,
  getExpense,
  deleteExpense
} = require('../controllers/expense');

const {
  addIncome,
  getIncomes,
  deleteIncome
} = require('../controllers/income');

const {
  registerUser,
  loginUser,
  getUserProfile,
  guestLogin
} = require('../controllers/auth');

const authMiddleware = require('../middleware/authMiddleware');

// ============================
// AUTHENTICATION ROUTES (Public)
// ============================

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.post('/guest-login', guestLogin); // Optional: Add this route if using guest login
router.get('/profile', authMiddleware, getUserProfile);


// ============================
// INCOME ROUTES (Protected)
// ============================

router.post('/add-income', authMiddleware, addIncome);
router.get('/get-incomes', authMiddleware, getIncomes);
router.delete('/delete-income/:id', authMiddleware, deleteIncome);


// ============================
// EXPENSE ROUTES (Protected)
// ============================

router.post('/add-expense', authMiddleware, addExpense);
router.get('/get-expenses', authMiddleware, getExpense); // ✅ changed getExpense → getExpenses
router.delete('/delete-expense/:id', authMiddleware, deleteExpense);


module.exports = router;
