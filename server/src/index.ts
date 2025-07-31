import express, { Express } from "express";
import bodyParser from "body-parser";
import { setList, getList } from "./routes";

// Configure and start the HTTP server.
const port : number = 8088;
const app : Express = express();
app.use(bodyParser.json());

app.put("/api/setList", setList);
app.get("/api/getList", getList);

app.listen(port, () => console.log(`Server listening on ${port}`));