const express = require('express');
const app = express();
const cors = require("cors")
const productRoutes = require('./Routes/ProductRoutes')
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use('/api',productRoutes)

const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`);
})
