import { Router } from "express";

import auth from "./services/authentication";

import UserController from "./controllers/UserController";
import AuthController from "./controllers/AuthController";
import ProjectController from "./controllers/ProjectsController";
import VacancyController from "./controllers/VacancyController";

const router = Router();

// Rota de login
router.post("/login", AuthController.create);

// Rotas de usuário
router.post("/user", UserController.create);
router.get("/user", UserController.read);

// Rotas de projetos
router.post("/project", auth.verifyJWT, ProjectController.create);
router.get("/project", auth.verifyJWT, ProjectController.read);
router.put("/project", auth.verifyJWT, ProjectController.update);
router.delete("/project", auth.verifyJWT, ProjectController.delete);

// Rotas de vagas
router.post("/vacancies", auth.verifyJWT, VacancyController.create);
router.get("/vacancies", auth.verifyJWT, VacancyController.read);
router.put("/vacancies", auth.verifyJWT, VacancyController.update);
router.delete("/vacancies", auth.verifyJWT, VacancyController.delete);

export default router;
