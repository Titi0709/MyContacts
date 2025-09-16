const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");

beforeAll(async () => {
    await User.deleteMany({});
});

describe("Auth API", () => {
    it("should register a user", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({
                name: "TestUser",
                email: "testuser@mail.com",
                password: "123456"
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toMatch(/Uti créé/);
    });

    it("should login a user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "testuser@mail.com",
                password: "123456"
            });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
