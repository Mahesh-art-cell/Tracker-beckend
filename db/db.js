// const mongoose = require('mongoose');
// require('dotenv').config(); // ✅ Load environment variables

// const db = async () => {
//     try {
//         if (!process.env.MONGO_URL) {
//             throw new Error("❌ MONGO_URL is not defined in .env file");
//         }

//         mongoose.set('strictQuery', false);
//         await mongoose.connect(process.env.MONGO_URL); // 👈 no options needed

//         console.log('✅ Database Connected Successfully');
//     } catch (error) {
//         console.error('❌ DB Connection Error:', error.message);
//         process.exit(1);  // Stop execution on failure
//     }
// };

// module.exports = db;


const mongoose = require('mongoose');
require('dotenv').config();

const db = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is not defined in .env file");
        }

        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI); // 👈 use correct key

        console.log('✅ Database Connected Successfully');
    } catch (error) {
        console.error('❌ DB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = db;
