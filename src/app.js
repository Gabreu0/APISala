import express from "express";
import connectToDatabase from "./config/dbConnect.js";
import routes from "./routes/index.js";
import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

const connection = await connectToDatabase();

connection.on("error", (error) => {
    console.error("Erro de conexão: ", error);
});

connection.once("open", () => {
    console.log("Conexão com o mongo atlas realizada com sucesso!");
});

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

routes(app);

export default app;

