import express from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "views"));

// Body parser
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

// Test route
app.get("/", (req, res) => {
  res.render("index"); // renders views/index.ejs
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
