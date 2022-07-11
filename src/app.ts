import { loadControllers } from "awilix-express";
import express, { Application } from "express";
import cors from 'cors';
import LoadContainer from "./container";

const app: Application = express();
app.use(express.json());
app.use(cors());

LoadContainer(app);

app.use(loadControllers("controllers/*.ts", { cwd: __dirname }));

export default app;
