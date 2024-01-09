import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) { 
    return res.status(401).json({ message: "Unauthorized" });
  }

  const [bearer, token] = authorizationHeader.split(' ');

  if (!token || !bearer|| bearer.toLowerCase() !== 'bearer') {
    return res.status(401).json({ message: "Invalid authorization header format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
    req.body.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default verifyToken;