const PORT = 4000;
const DB_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017/WAMarketPlace"

module.exports = {PORT, DB_URL};