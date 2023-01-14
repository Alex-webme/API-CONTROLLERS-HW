import supertest from "supertest";
import config from "../config";

const user = {
  login: (payload) => {
    return supertest(config.url).post("/api/v1/login").send(payload);
  },

  getAuthToken: async () => {
    const payload = config.credentials;
    const res = await user.login(payload);
    return res.body.token;
  },

  getUserInfo: (token) => {
    return supertest(config.url)
      .get("/api/v1/user")
      .set("Authorization", `Bearer ${token}`)
      .send();
  },

  createUser: () => {
    return supertest(config.url).post("/api/v1/register").send({
      email: "username88@mail.com",
      id: 88,
      password: "password88",
      username: "username88",
    });
  },
};

export default user;
