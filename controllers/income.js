const IncomeSchema = require("../models/IncomeModel");

// @desc    Add a new income
// exports.addIncome = async (req, res) => {
//     const { title, amount, category, description, date } = req.body;

//     try {
//         // Basic validation
//         if (!title || !category || !description || !date || typeof amount !== 'number' || amount <= 0) {
//             return res.status(400).json({ message: 'All fields are required and amount must be a positive number' });
//         }

//         // Create new income
//         const income = new IncomeSchema({
//             title,
//             amount,
//             category,
//             description,
//             date,
//             user: req.user.id // user ID from authMiddleware
//         });

//         await income.save();

//         return res.status(201).json({ 
//             message: '✅ Income added successfully', 
//             data: income 
//         });
//     } catch (error) {
//         console.error('Add Income Error:', error);
//         res.status(500).json({ message: 'Server error', error: error.message });
//     }
// };

exports.addIncome = async (req, res) => {
    const { title, amount, category, description, date } = req.body;

    try {
        // Basic validation
        if (!title || !category || !description || !date || typeof amount !== 'number' || amount <= 0) {
            return res.status(400).json({ message: 'All fields are required and amount must be a positive number' });
        }

        // Create new income
        const income = new IncomeSchema({
            title,
            amount,
            category,
            description,
            date,
            user: req.user.id  // ✅ Pulled from middleware
        });

        await income.save();

        return res.status(201).json({ 
            message: '✅ Income added successfully', 
            data: income 
        });
    } catch (error) {
        console.error('Add Income Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



// @desc    Get all incomes for logged-in user
exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find({ user: req.user.id }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: incomes.length,
            data: incomes
        });
    } catch (error) {
        console.error('Get Incomes Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete income by ID
exports.deleteIncome = async (req, res) => {
    const { id } = req.params;

    try {
        const income = await IncomeSchema.findOne({ _id: id, user: req.user.id });

        if (!income) {
            return res.status(404).json({ message: 'Income not found or unauthorized' });
        }

        await IncomeSchema.findByIdAndDelete(id);

        return res.status(200).json({
            message: '🗑️ Income deleted successfully',
            deletedId: id
        });
    } catch (error) {
        console.error('Delete Income Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
