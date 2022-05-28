import { Request, Response } from "express";
import { CError, CSuccess } from "../classes/responses";

import Project from "../models/Project";
import User from "../models/User";

class ProjectControler {
  /**
   *
   * @param name Nome do projeto
   * @param type Tipo de projeto
   * @param program Programa usado pra fazer o projeto
   * @returns Projeto criado
   */
  async create(request: Request, response: Response) {
    try {
      const { id }: { id: any } = Object(request["query"]);

      const { name, type, program }: { name: string; type: string; program: string } = Object(request["body"]);

      if (!name || !type) {
        return response.status(403).send(new CError("Error at method create.", "Project name and type are required."));
      }

      const project = await Project.create({
        user_id: id,
        name,
        type,
        program,
      });

      return response.status(200).send(new CSuccess(true, project));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method create.", error));
    }
  }

  /**
   * Rota para leitura de projetos
   * @returns timeline Timeline de projetos
   */
  async read(request: Request, response: Response) {
    try {
      const { id }: { id: any } = Object(request["query"]);
      const users = await User.find({}, "name email");
      const projects = await Project.find({ user_id: id });

      return response.status(200).send(new CSuccess(true, { users, projects }));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method read.", error));
    }
  }

  /**
   * Rota para atualização de um projeto
   * @param request Dados para atualização
   * @returns Updated project
   */
  async update(request: Request, response: Response) {
    try {
      return response.status(200).send("ok");
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method update.", error));
    }
  }

  /**
   * Rota para deletar um projeto
   * @param request Id do projeto a ser deletado
   * @returns Deleted project
   */
  async delete(request: Request, response: Response) {
    try {
      return response.status(200).send("ok");
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method delete.", error));
    }
  }
}

export default new ProjectControler();
