require('dotenv').config()

const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL

module.exports = {
    PORT,
    MONGO_URL
}