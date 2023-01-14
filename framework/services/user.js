import supertest from "supertest";
import config from "../config";

const user = {
  // Функция авторизации
  login: (payload) => {
    return supertest(config.url).post("/api/v1/login").send(payload);
  },
};

export default user;
