const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user.model");
const Contact = require("../src/models/contact.model");

let token;
let contactId;

beforeAll(async () => {
    await User.deleteMany({});
    await Contact.deleteMany({});

    await request(app).post("/api/auth/register").send({
        name: "UserTest",
        email: "usertest@mail.com",
        password: "123456",
    });

    const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "usertest@mail.com", password: "123456" });

    token = res.body.token;
});

describe("Contacts API", () => {
    it("should create a contact", async () => {
        const res = await request(app)
            .post("/api/contacts")
            .set("Authorization", `Bearer ${token}`)
            .send({
                firstName: "John",
                lastName: "Doe",
                phone: "1234567890",
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("_id");
        contactId = res.body._id;
    });

    it("should get contacts", async () => {
        const res = await request(app)
            .get("/api/contacts")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    it("should update a contact", async () => {
        const res = await request(app)
            .patch(`/api/contacts/${contactId}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ phone: "0987654321" });
        expect(res.statusCode).toBe(200);
        expect(res.body.phone).toBe("0987654321");
    });

    it("should delete a contact", async () => {
        const res = await request(app)
            .delete(`/api/contacts/${contactId}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toMatch(/Contact supprimé/);
    });
});
