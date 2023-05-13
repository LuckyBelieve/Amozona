const express = require('express');
const app = express();
const cors = require("cors")
const productRoutes = require('./Routes/ProductRoutes')
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{console.log(err.message)})


app.use(cors({
    origin: "http://localhost:5173"
}));
app.use('/api',productRoutes)

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
