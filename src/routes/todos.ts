import { Router, Request, Response } from "express";
import Todo from "../models/Todo";
import { Session, SessionData } from "express-session";
import mongoose from "mongoose";


interface CustomRequest extends Request {
  session: Session & Partial<SessionData> & { userId?: any };
}

const router = Router();

// GET
router.get("/todos", async (req: CustomRequest, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const filter: any = { user: req.session.userId };

    if (req.query.status) {
      filter.status = req.query.status;
    }
    const todos = await Todo.find(filter);
    // console.log("Todos fetched:", todos);
    res.render("todos", { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;


