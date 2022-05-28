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
      const { token }: { token: any } = Object(request["query"]);

      const { name, type, program }: { name: string; type: string; program: string } = Object(request["body"]);

      // Desestrutura token
      const userId = token["id"]["id"];

      if (!name || !type) {
        return response.status(403).send(new CError("Error at method create.", "Project name and type are required."));
      }

      const project = await Project.create({
        user_id: userId,
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
      const { token }: { token: any } = Object(request["query"]);

      // Desestrutura token
      const userId = token["id"]["id"];

      const projects = await Project.find({ user_id: userId });

      return response.status(200).send(new CSuccess(true, projects));
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
      const {
        newName,
        newType,
        newProgram,
      }: {
        newName: string;
        newType: string;
        newProgram: string;
      } = Object(request["body"]);

      // _id da vaga
      const { id }: { id: string } = Object(request["query"]);

      const targetProject = await Project.findOne({ _id: id });

      if (targetProject === null || !targetProject) {
        return response.status(404).send(new CError("Error at method update.", "No project found."));
      }

      const update = {
        name: newName,
        type: newType,
        program: newProgram,
      };

      // Atualiza o projeto
      const project = await Project.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      // Retorna sucesso
      return response.status(200).send(new CSuccess(true, project));
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
      // _id da vaga
      const { id }: { id: string } = Object(request["query"]);

      if (!id) {
        return response.status(403).send(new CError("Error at method delete.", "An id must be sent."));
      }

      // Apaga a vaga do banco
      await Project.findByIdAndDelete(id);

      return response.status(200).send(new CSuccess(true, "Project deleted successfully"));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method delete.", error));
    }
  }
}

export default new ProjectControler();
