import { Router } from "express";

// load middleware
import requiresAuth from "./middleware/requiresAuthentication";
import validateRequestBody from "./middleware/validateRequestBody";

// load api modules
import setupWelcome from "./routes/welcome";
import setupSearch from "./routes/search";
import setupGetSchool from "./routes/school";

// create a new router for the app
export let router = Router();

setupWelcome(router, {
  requiresAuth,
  validateRequestBody
});

setupSearch(router, {
  requiresAuth,
  validateRequestBody
});

setupGetSchool(router, {
  validateRequestBody
});

export var version = 1;
