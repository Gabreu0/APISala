import express from "express";
import posts from "./postRoutes.js";
import authors from "./authorRoutes.js";
import users from "./userRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Node.js com Express"));

    app.use(express.json());

    app.use(auth);

    app.use(posts);
    app.use(authors);
    app.use(users);
};

export default routes;