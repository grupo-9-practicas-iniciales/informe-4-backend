import express from "express";
import { UserInterface } from "../../interfaces/interfaces";

declare global {
    namespace Express {
        interface Request {
            user?: UserInterface
        }
    }
}