require('dotenv').config();

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "up the punx",
    NUM: process.env.num || 8
};