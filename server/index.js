import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import transactionRoutes from "./routes/transactionRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config()

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://cashtrust.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json())
app.use(cookieParser());

app.get("/ping", (req, res) => {
  res.send("pong");
});

app.use('/api/transactions', transactionRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server has started on ${PORT}`)
})