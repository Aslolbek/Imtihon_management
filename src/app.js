import express from "express";
import {module} from "./start/modul.js"
import { run } from "./start/run.js";
const app =  express();

module(app)
run(app);