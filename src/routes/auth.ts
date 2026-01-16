import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { Session, SessionData } from "express-session";

interface CustomRequest extends Request {
  session: Session & Partial<SessionData> & { userId?: any };
}

const router = Router();

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/login", (req, res) => {
  res.render("login");
});

// Signup
router.post("/signup", async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.send("Username already exists");

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hash });

    req.session.userId = user._id;

    res.redirect("/login"); // redirect to login.ejs
  } catch (err) {
    console.error(err);
    res.send("Error occurred");
  }
});

// Login
router.post("/login", async (req: CustomRequest, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.send("Invalid username");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.send("Invalid password");

    req.session.userId = user._id.toString();
    res.redirect("/todos"); // redirect to todos.ejs
  } catch (err) {
    console.error(err);
    res.send("Error occurred");
  }
});

export default router;
