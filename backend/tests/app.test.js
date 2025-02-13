import request from "supertest";
import app from "../app.js";
import { connectDB, disconnectDB } from "../config/db.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt"

let mongoServer;

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {
    disconnectDB();
});

describe("Tests - User Controller - Login", () => {

    let user

    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password", salt);
        user = await userModel.create({
            name: "test",
            email: "test@gmail.com",
            password: hashedPassword,
        });
    })

    afterAll(async () => {
        await userModel.findByIdAndDelete(user._id)
    })

    test("POST /api/user/login with non-existing email - 404", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "nonexisting@gmail.com",
            password: "password",
        });
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
    });

    test("POST /api/user/login with wrong password - 400", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "test@gmail.com",
            password: "wrongPassword",
        });
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Invalid credentials");
    });

    test("POST /api/user/login with correct credentials - 200", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "test@gmail.com",
            password: "password",
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
        expect(response.body.message).toBe("User loged in");
    });
});

describe("Tests - User Controller - Register", () => {

    test("POST /api/user/register with invalid email - 400", async () => {
        const response = await request(app).post("/api/user/register").send({
            name: "test",
            email: "test",
            password: "senha123"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Enter a valid email")
    })

    test("POST /api/user/register with existing email - 409", async () => {

        const user = await userModel.create({
            name: "test",
            email: "test@gmail.com",
            password: "password"
        })

        const response = await request(app).post("/api/user/register").send({
            name: "test",
            email: "test@gmail.com",
            password: "password"
        })
        expect(response.status).toBe(409)
        expect(response.body.message).toBe("User email already exists")
        await userModel.findByIdAndDelete(user._id)
    })

    test("POST /api/user/register with password length less then 8 - 400", async () => {
        const response = await request(app).post("/api/user/register").send({
            name: "test",
            email: "test@gmail.com",
            password: "passwor"
        })
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Password must have at least 8 characters")
    })

    test("POST /api/user/register correct information - 201", async () => {
        const response = await request(app).post("/api/user/register").send({
            name: "test",
            email: "test@gmail.com",
            password: "password"
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("token")
        expect(response.body.message).toBe("User registered")   

        await userModel.findOneAndDelete({ name: "test"})
    })
})
