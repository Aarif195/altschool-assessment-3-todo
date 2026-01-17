import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Session, SessionData } from "express-session";

interface CustomRequest extends Request {
  session: Session & Partial<SessionData> & { userId?: any };
}

const router = Router();

router.get("/", (req, res) => {
  res.render("index", { error: null });
});

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

// Signup
router.post("/", async (req: CustomRequest, res: Response) => { 
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.render("index", { error: "All fields are required" });
  }

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.render("index", { error: "Username already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });

    req.session.userId = user._id;

    res.redirect("/login"); // redirect to login.ejs
  } catch (err) {
    console.error(err);
    res.render("index", { error: "An error occurred during signup" });
  }
});

// Login
router.post("/login", async (req: CustomRequest, res: Response) => {
  const username = req.body.username?.trim();
  const password = req.body.password?.trim();

  if (!username || !password) {
    return res.render("login", { error: "Please enter username and password" });
  }

try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.render("login", { error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("login", { error: "Invalid credentials" });
    }

    req.session.userId = user._id.toString();
    res.redirect("/todos");
  } catch (err) {
    res.render("login", { error: "An error occurred during login" });
  }
});

export default router;
