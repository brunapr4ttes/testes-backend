import request from "supertest";
import app from "../app";
import { User } from "../models/User";

describe("Testando rotas da API", () => {
  let email = "test@jest.com";
  let password = "1234";

  beforeAll(async () => {
    await User.sync({ force: true });
  });

  it("Deve ping pong", (done) => {
    request(app)
      .get("/ping") // Aqui vai variar de acordo com nosso end point
      .then((response) => {
        expect(response.body.pong).toBeTruthy();
        return done();
      });
  });

  it("Deve registrar um novo usuario", (done) => {
    request(app)
      .post("/register")
      .send(`email=${email}&password=${password}`) // formato URLEncoded
      .then((response) => {
        expect(response.body.error).toBeUndefined();
        expect(response.body).toHaveProperty("id");
        return done();
      });
  });

  it("Não deve registrar um novo usuario com email existente", (done) => {
    request(app)
      .post("/register")
      .send(`email=${email}&password=${password}`) // formato URLEncoded
      .then((response) => {
        expect(response.body.error).not.toBeUndefined();
        return done();
      });
  });

  it("Não deve registrar um novo usuário sem a senha", (done) =>{
    request(app)
      .post("/register")
      .send(`email=${email}`)
      .then((response) => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it("Não deve registrar um novo usuário sem a email", (done) =>{
    request(app)
      .post("/register")
      .send(`password=${password}`)
      .then((response) => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it("Não deve registrar um novo usuário sem os dados", (done) =>{
    request(app)
      .post("/register")
      .send(``)
      .then((response) => {
        expect(response.body.error).not.toBeUndefined()
        return done()
      })
  })

  it("Deve logar corretamente", (done) =>{
    request(app)
      .post("/login")
      .send(`email=${email}&password=${password}`)
      .then((response) => {
        expect(response.body.status).toBeTruthy()
        return done()
    
      })
  })



});
