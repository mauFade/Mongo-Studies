import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.json";

class auth {
  async verifyJWT(request: Request, response: Response, next: NextFunction) {
    if (!request["headers"]["authorization"]) {
      return response.status(401).send({ auth: false, message: "No authorization token provided." });
    }

    let token = "";
    token = request["headers"]["authorization"];
    token = token.replace(/^Bearer /, "");

    if (!token) {
      return response.status(401).send({ auth: false, message: "No token provided." });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
      if (err || !decoded) {
        return response.status(401).send({ auth: false, message: "Failed to authenticate token." });
      }

      request["query"]["token"] = decoded;

      return next();
    });
  }
}

export default new auth();
