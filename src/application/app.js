import express from "express";
import { Router } from "../routes/router.js";

export const application = express();

application.use(express.json());
application.use(Router);