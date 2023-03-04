import { attachControllers } from "@decorators/express";
import express from "express";
import { Product } from "./Product/Product.controller";

const routes = express.Router();

attachControllers(routes, [Product]);

export { routes };
