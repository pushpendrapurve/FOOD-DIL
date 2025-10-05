import express from 'express';
import cors from 'cors'
import { connectDB } from './config/dbConnection.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRouter.js';
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
const app = express()
let port = 3000;

export let pass = "12345"

app.use(express.json())
app.use(cors());

//connect to db
connectDB();

//api endPoints
app.use('/api/food',foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


app.get('/',(req,res)=>{
    res.send("api!")
})

app.listen(port,(req,res)=>{
    console.log("=> http://localhost:"+port)
})