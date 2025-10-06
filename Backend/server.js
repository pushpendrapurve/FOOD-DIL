import express from 'express';
import cors from 'cors';
import { connectDB } from './config/dbConnection.js';
import foodRouter from './routes/foodRouter.js';
import userRouter from './routes/userRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import 'dotenv/config';  

const app = express();
let port = process.env.PORT || 3000;


app.use(express.json());
app.use(cors({ origin: '*' }));

try {
  connectDB();
  console.log("✅ Database connected successfully");
} catch (err) {
  console.error("❌ DB connection failed:", err);
}

// API Endpoints
app.use('/api/food', foodRouter);
app.use('/images', express.static('uploads'));
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);


app.get('/', (req, res) => {
  res.send("API is running successfully!");
});


app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

 
export default app;
