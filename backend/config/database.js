const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const db = async() =>{

    try {
        const con = await mongoose.connect(process.env.DATABASE_URI);
        console.log(`mongdo db connected ${con.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}
module.exports = db;