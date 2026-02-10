import express from 'express';
import cors from 'cors';
import Connection from '../Connection.js';
import userRoutes from './Routes/userRoutes.js';
import authRoutes from './Routes/authRoutes.js';
import incomeRoutes from './Routes/incomeRoutes.js';
import expenseRoutes from './Routes/expenseRoutes.js';
import dashboardRoutes from './Routes/dashboardRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express(); // Initialize express app

app.use(cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))
app.use(cookieParser())


Connection(); // Connect to MongoDB

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);





app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});    