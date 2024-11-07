import express from "express";
import { Router } from "../routes/Routes.js";

export const Application = express();

Application.use(express.json());
Application.use(Router);