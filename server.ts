import express from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./src/routes/auth";
import todosRoutes from "./src/routes/todos";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "src", "public")));


const MONGO_URI = process.env.MONGO_URI!;
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(authRoutes);
app.use(todosRoutes);

// EJS setup

const isDist = __dirname.endsWith('dist');

const viewsPath = isDist 
  ? path.join(__dirname, '..', 'src', 'views') 
  : path.join(__dirname, 'src', 'views');

app.set("views", viewsPath);
app.set("view engine", "ejs");

// Set static to the public folder
const publicPath = isDist
  ? path.join(__dirname, '..', 'src', 'public') 
  : path.join(__dirname, 'src', 'public');

app.use(express.static(publicPath));



// Test route
app.get("/", (req, res) => {
  res.render("index"); 
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
