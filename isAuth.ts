import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";
import { initDatabase } from "./db.js"; // Path to your database utility

interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.token as string;

    if (!token) {
      res.status(403).json({
        message: "Please Login",
      });
      return;
    }

    const decodedData = jwt.verify(
      token,
      process.env.JWT_SEC as string
    ) as JwtPayload;

    if (!decodedData || !decodedData._id) {
      res.status(403).json({
        message: "Invalid Token",
      });
      return;
    }

    const database = await initDatabase();
    const collection = database.collection<IUser>("users");

    const user = await collection.findOne({
      _id: new ObjectId(decodedData._id),
    });

    if (!user) {
      res.status(403).json({
        message: "User not found",
      });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in isAuth middleware:", error);
    res.status(403).json({
      message: "Please Login",
    });
  }
};
