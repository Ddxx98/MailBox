import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Route imports (use .js extensions!)
// import userRoute from "./routes/user.js";
// import productRoute from "./routes/product.js";
import signupRoute from "./routes/signup.js";
import loginRoute from "./routes/login.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// API routes
// app.use("/api/users", userRoute);
// app.use("/api/products", productRoute);
app.use("/api", signupRoute);
app.use("/api", loginRoute);

// Generic error handler — always after all routes
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong.' });
});

// Robust DB connection and server launch
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    });