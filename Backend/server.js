const express = require('express');
const app = express();
const cors = require("cors")
const productRoutes = require('./Routes/ProductRoutes');
const userRoutes = require("./Routes/userRoutes");
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{console.log(err.message)})

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(cors({
    origin: "http://localhost:5173"
}));
app.use('/api',productRoutes);
app.use('/api/users',userRoutes);

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
