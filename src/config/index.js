const PORT = 4000;
const DB_URL = process.env.DB_URL || "mongodb+srv://rafi:root@marketplace.2wx2gjx.mongodb.net/?retryWrites=true&w=majority"

module.exports = {PORT, DB_URL};