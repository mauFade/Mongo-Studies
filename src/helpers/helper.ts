import jwt from "jsonwebtoken";
import auth from "../config/auth.json";

class helper {
  /**
   * Função para gerar um token com jwt
   * @param id Id do usuário
   * @returns Token
   */
  async generateToken(params: {}) {
    return jwt.sign({ id: params }, auth.secret, {
      // Token expira em 1 dia
      expiresIn: 86400,
    });
  }
}

export default new helper();
