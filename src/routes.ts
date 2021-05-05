import { Router } from "express";
import { test01 } from "./controllers/test01";

const routes = Router();

routes.route("/").get(test01);

export default routes;
