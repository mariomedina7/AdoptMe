import { Router } from "express";
import usersRouter from "./users.router.js";
import petsRouter from "./pets.router.js";
import adoptionsRouter from "./adoption.router.js";
import sessionsRouter from "./sessions.router.js";
import mocksRouter from "./mocks.router.js";

const indexRouter = Router();

indexRouter.use("/users", usersRouter);
indexRouter.use("/pets", petsRouter);
indexRouter.use("/adoptions", adoptionsRouter);
indexRouter.use("/sessions", sessionsRouter);
indexRouter.use("/mocks", mocksRouter);

export default indexRouter;
