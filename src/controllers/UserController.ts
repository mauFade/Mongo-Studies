import { Request, Response } from "express";
import { CSuccess, CError } from "../classes/responses";

import User from "../models/User";
import helper from "../helpers/helper";

class UserInstant {
  /**
   * Rota para criação de um usuário
   * @param name Nome do usuário
   * @param email Email do usuário
   * @param password Password do usuário
   * @returns Usuário criado
   */
  async create(request: Request, response: Response) {
    try {
      const { name, email, password }: { name: string; email: string; password: string } = Object(request["body"]);

      if (!name || !email || !password) {
        return response.status(403).send(new CError("Error at method create.", "All fields are required."));
      }

      const sameEmail = await User.findOne({ email: email });

      // Se já existir um usuário com esse email, retorna erro
      if (sameEmail) {
        return response.status(403).send(new CError("Error at method create.", "This email is already in use."));
      }

      const user = await User.create({
        name,
        email,
        password,
      });

      const token = await helper.generateToken({ id: user["id"] });

      return response.status(200).send(new CSuccess(true, { user, token }));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method create.", error));
    }
  }

  /**
   *  Rota para listagem de usuários criados
   * @returns List de usuários
   */
  async read(request: Request, response: Response) {
    try {
      const users = await User.find();

      // Define a senha como undefined para que a mesama não seja enviada na resposta
      for (const index in users) {
        users[index]["password"] = undefined;
      }

      // Retorna usuários
      return response.status(200).send(new CSuccess(true, users));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method read.", error));
    }
  }

  /**
   * Rota para update de dados de um usuário
   * @params Dados para atualização
   * @returns Updated user
   */
  async update(request: Request, response: Response) {
    try {
      const { newName, newEmail, newPassword }: { newName: string; newEmail: string; newPassword: string } = Object(
        request["body"]
      );

      const { token } = Object(request["query"]);

      // Id do usuário logado a fazer o update
      const id = token["id"]["id"];

      // Objeto de update
      const update = {
        name: newName,
        email: newEmail,
        password: newPassword,
      };

      // Atualiza o usuário
      const user = await User.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      return response.status(200).send(new CSuccess(true, user));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method update", error));
    }
  }

  /**
   * Rota para excluir um usuário
   * @params Usuário a ser excluido
   * @returns Deleted user
   */
  async delete(request: Request, response: Response) {
    try {
      const { token } = Object(request["query"]);

      // Id do usuário logado a fazer o delete
      const id = token["id"]["id"];

      // Delete o usuário
      await User.findByIdAndDelete(id);

      return response.status(200).send(new CSuccess(true, "User deleted successfully."));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method delete", error));
    }
  }
}

export default new UserInstant();
