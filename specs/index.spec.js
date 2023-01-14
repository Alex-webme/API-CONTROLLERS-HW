import user from "../framework/services/user";
import config from "../framework/config";

describe("POST /api/v1/login", () => {
  test("API имеет метод для авторизации", async () => {
    const res = await user.login(config.credentials);
    expect(res.status).not.toEqual(404);
  });

  test("Авторизация с валидными логином и паролем должна быть 200 и вернуть токен", async () => {
    const res = await user.login(config.credentials);
    expect(res.status).toEqual(200);
    expect(typeof res.body.token).toEqual("string");
    expect(res.body.token.length).toBeGreaterThan(0);
  });

  test("Авторизация должна возвращать код 1011 и сообщение об ошибке, если username неверный", async () => {
    const res = await user.login({ username: "invalid", password: "demo" });
    expect(res.status).toEqual(412);
    expect(res.body).toEqual({
      code: 1011,
      message: "Wrong username or password.",
    });
  });

  test("Авторизация должна возвращать код 1011 и сообщение об ошибке, если password неверный", async () => {
    const res = await user.login({ username: "demo", password: "invalid" });
    expect(res.status).toEqual(412);
    expect(res.body).toEqual({
      code: 1011,
      message: "Wrong username or password.",
    });
  });

  test("Авторизация должна возвращать код 1004 и сообщение об ошибке, если password является пустой строкой", async () => {
    const res = await user.login({ username: "demo", password: "" });
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      code: 1004,
      message: "Please specify a username and a password.",
    });
  });
});

describe("GET /api/v1/user", () => {
  test("Информацию о пользователе можно получить, если токен правильный", async () => {
    const token = await user.getAuthToken();
    const res = await user.getUserInfo(token);
    expect(res.status).toEqual(200);
  });
});

describe("POST /api/v1/register", () => {
  test("Создание нового пользователя проходит успешно", async () => {
    const res = await user.createUser();
    expect(res.status).toEqual(200);
    expect(res.body.username).toBe("username88");
  });

  test("Создание нового пользователя возвращает статус с кодом ошибки, если пользователь с таким username был создан ранее", async () => {
    const res = await user.createUser();
    expect(res.status).toEqual(400);
    expect(res.body).toEqual({
      code: 1001,
      message: "A user with this username already exists.",
    });
  });
});
