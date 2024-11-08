import express from "express";
import { TransactionRoute } from "./TransactionRoute.js";
import { Middleware } from "../middleware/Middleware.js";

export const Router = express.Router();

Router.use(TransactionRoute);
Router.use(Middleware.errorMiddleware);