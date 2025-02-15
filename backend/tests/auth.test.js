import request from "supertest";
import app from "../app.js";
import { connectDB, disconnectDB } from "../config/db.js";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { jest } from "@jest/globals";
import authMiddleware from "../middleware/auth.js";

beforeAll(async () => {
    connectDB();
});

afterAll(async () => {
    disconnectDB();
});

describe("Tests - Auth middleware ", () => {
    let req, res, next, user;

    beforeAll(async () => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password", salt);
        user = await userModel.create({
            name: "auth",
            email: "auth@gmail.com",
            password: hashedPassword,
        }); 
    })

    beforeEach(() => {
        req = { headers: {}, body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    afterAll(async () => {
        await userModel.findByIdAndDelete(user._id)
    })

    test("Authorization without token - 403", () => {
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Not authorized. Login again",
        });
    });

    test("Authorization with wrong token - 500", () => {
        req.headers.token = "wrongToken";
        authMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Error on auth",
            error: expect.objectContaining({
                name: "JsonWebTokenError",
                message: "jwt malformed",
            }),
        })
    });

    test("Authorization with correct token - run next", async () => {
        const response = await request(app).post("/api/user/login").send({
            email: "auth@gmail.com",
            password: "password",
        });
        const token = response.body.token
        req.headers = { token };
        authMiddleware(req, res, next);
        expect(req.body).toHaveProperty("userId");
        expect(next).toHaveBeenCalled();
    });
});
