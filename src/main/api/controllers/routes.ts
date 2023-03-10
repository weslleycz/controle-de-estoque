import { attachControllers } from "@decorators/express";
import express from "express";
import { Product } from "./Product/Product.controller";
import { Sales } from "./Sales/Sales.controller";

const routes = express.Router();

attachControllers(routes, [Product,Sales]);

export { routes };
