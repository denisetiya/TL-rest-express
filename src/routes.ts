import type { Router } from "express";
import express from "express";
import hello from "./module/hello/hello.controller";

const routes: Router = express.Router();

routes.use("/hello", hello);

export default routes;
