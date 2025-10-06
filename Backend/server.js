import express from 'express';
import cors from 'cors'
import { connectDB } from './config/dbConnection.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRouter.js';
import 'dotenv/config'
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
const app = express()
let port =  process.env.PORT || 3000;

export let pass = "12345"

app.use(express.json())
app.use(cors({
  origin: "*"
}));


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

if (process.env.NODE_ENV === "production") {
  app.listen(port, () => {
    console.log("=> http://localhost:" + port);
  });
}

export default app;