import { Router } from "express";
import { test01 } from "./controllers/test01";

const routes = Router();

routes.route("/test01").get(test01);

export default routes;
