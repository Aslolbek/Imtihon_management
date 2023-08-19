import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../api/routers/index.js";
import fileUpload from "express-fileupload";

export const module = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(fileUpload());
    app.use(cors({ origin: '*' }));
    app.use(cookieParser());
    app.use(express.static(process.cwd() + "/uploads"));
    app.use(routes);
};