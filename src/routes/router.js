import express from "express";
import { TransactionRoute } from "./transactions-route.js";

export const Router = express.Router();

Router.use(TransactionRoute);