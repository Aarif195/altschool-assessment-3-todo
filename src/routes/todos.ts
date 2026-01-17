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
    const todos = await Todo.find(filter).sort({ createdAt: -1 });
    // console.log("Todos fetched:", todos);
    res.render("todos", { todos });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST
router.post("/todos", async (req: CustomRequest, res) => {
  try {
    if (!req.session.userId) {
      return res.redirect("/login");
    }
    const { title } = req.body;

    if (!title) {
      return res.status(400).send("Title is required");
    }

    const todo = await Todo.create({
      title,
      user: req.session.userId,
    });

    console.log("Body:", req.body);
    console.log("Session userId:", req.session.userId);

    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// MARK AS COMPLETED
router.post("/todos/:id/complete", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { status: "completed" });
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// MARK AS DELETED
router.post("/todos/:id/delete", async (req, res) => {
  try {
    await Todo.findByIdAndUpdate(req.params.id, { status: "deleted" });
    res.redirect("/todos");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});


export default router;
