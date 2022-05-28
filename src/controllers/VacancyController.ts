import { Request, Response } from "express";
import { CSuccess, CError } from "../classes/responses";

import Vacancy from "../models/Vacancy";

class VacancyController {
  /**
   * Rota para criação de uma vaga
   * @param vacancy Nome da vaga
   * @param level Nível de experiência
   * @param description Descrição da vaga
   * @param salary Salário sendo oferecido
   * @param company Empresa
   * @param contact Email para envio de currículos
   * @return Vacancy created
   */
  async create(request: Request, response: Response) {
    try {
      // Recebe dados do corpor da requisição
      const {
        vacancy,
        level,
        description,
        salary,
        company,
        contact,
      }: {
        vacancy: string;
        level: string;
        description: string;
        salary: number;
        company: string;
        contact: string;
      } = Object(request["body"]);

      // Se algum dos campos não for enviado, retorna erro
      if (!vacancy || !level || !description || !salary || !company || !contact) {
        return response.status(403).send(new CError("Error at method create.", "All fields are required."));
      }

      // Salva vaga no banco
      const oportunity = await Vacancy.create({
        vacancy,
        level,
        description,
        salary,
        company,
        contact,
      });

      // Retorna sucesso
      return response.status(200).send(new CSuccess(true, oportunity));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method create.", error));
    }
  }

  /**
   * Rota para leitura das vagas
   * @returns Vacancies Array
   */
  async read(request: Request, response: Response) {
    try {
      const vacancies = await Vacancy.find();

      return response.status(200).send(new CSuccess(true, vacancies));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method read.", error));
    }
  }

  /**
   * Rota para fazer update de uma vaga
   * @param vacancy Nome da vaga
   * @param level Nível de experiência
   * @param description Descrição da vaga
   * @param salary Salário sendo oferecido
   * @param company Empresa
   * @param contact Email para envio de currículos
   * @return Vacancy updated
   */
  async update(request: Request, response: Response) {
    try {
      const {
        newVacancy,
        newLevel,
        newDescription,
        newSalary,
        newCompany,
        newContact,
      }: {
        newVacancy?: string;
        newLevel?: string;
        newDescription?: string;
        newSalary?: string;
        newCompany?: string;
        newContact?: string;
      } = Object(request["body"]);

      // _id da vaga
      const { id }: { id: string } = Object(request["query"]);

      const targetVacancy = await Vacancy.findOne({ _id: id });

      if (targetVacancy === null || !targetVacancy) {
        return response.status(404).send(new CError("Error at method update.", "No post found."));
      }

      const update = {
        vacancy: newVacancy,
        level: newLevel,
        description: newDescription,
        salary: newSalary,
        company: newCompany,
        contact: newContact,
      };

      // Atualiza o post
      const post = await Vacancy.findOneAndUpdate({ _id: id }, update, {
        new: true,
      });

      return response.status(200).send(new CSuccess(true, post));

      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method update.", error));
    }
  }

  async delete(request: Request, response: Response) {
    try {
      // _id da vaga
      const { id }: { id: string } = Object(request["query"]);

      if (!id) {
        return response.status(403).send(new CError("Error at method delete.", "An id must be sent."));
      }

      // Apaga a vaga do banco
      await Vacancy.findByIdAndDelete(id);

      return response.status(200).send(new CSuccess(true, "Post deleted successfully"));
      // Caso algo dê errado
    } catch (error) {
      // Retorna erro
      return response.status(500).send(new CError("Error at method delete.", error));
    }
  }
}

export default new VacancyController();
