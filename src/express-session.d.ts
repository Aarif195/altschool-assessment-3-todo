// import "express-session";

// import { Types } from "mongoose";

// declare module "express-session" {
//   interface SessionData {
//     userId?: string | Types.ObjectId;
//   }
// }


import "express-session";

declare module "express-session" {
  interface SessionData {
    userId: any;
  }
}