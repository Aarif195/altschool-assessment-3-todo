import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  status: "pending" | "completed" | "deleted";
  user: string;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed", "deleted"], default: "pending" },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model<ITodo>("Todo", TodoSchema);
