const {connect} = require('mongoose');

const connectDB = (DB_URL) => {
    connect(DB_URL).then(()=>console.log("Mongo Connected")).catch(e=>console.log("Error while connecting to Mongo:", e))
}

module.exports = {connectDB}