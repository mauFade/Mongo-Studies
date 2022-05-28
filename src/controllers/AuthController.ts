import { Request, Response } from "express";
import { CSuccess, CError } from "../classes/responses";

import User from "../models/User";
import helper from "../helpers/helper";

class AuthenticationController {
  async create(request: Request, response: Response) {
    try {
      const { email, password }: { email: string; password: string } = Object(
        request["body"]
      );

      // Se não tiver email ou senha, retorna erro
      if (!email || !password) {
        return response
          .status(403)
          .send(
            new CError("Error at method create.", "All fields are required.")
          );
      }

      const user = await User.findOne({ email: email });

      // Se não for encontrado um usuário com esse email
      if (!user) {
        return response
          .status(404)
          .send(new CError("Error at method create.", "User not found."));
      }

      // Se a senha estiver errada
      if (password !== user["password"]) {
        return response
          .status(403)
          .send(new CError("Error at method create.", "Invalid password."));
      }

      const token = await helper.generateToken({ id: user["id"] });

      return response.status(200).send(new CSuccess(true, { user, token }));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response
        .status(500)
        .send(new CError("Error at method create.", error));
    }
  }
}

export default new AuthenticationController();
