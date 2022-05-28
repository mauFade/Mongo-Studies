import { ISuccess, IError } from "../interfaces/responses";

class CSuccess implements ISuccess {
  /**
   * Classe que implemente sucesso
   * @param success Status da resposta
   * @param data Dados
   */
  constructor(public success: boolean, public data: any) {
    this.success = success;
    this.data = data;
  }
}

class CError implements IError {
  /**
   * Classe que implementa erro
   * @param message Mensagem de erro
   * @param error Info do erro
   */
  constructor(public message: string, public error: any) {
    this.message = message;
    this.error = error;
  }
}

export { CSuccess, CError };
