import express from "express";
import cors from "cors";
import routerBook from "./routes/BookRouter.js";
import routerMember from "./routes/MemberRouter.js";
import routerTransaction from "./routes/TransactionRouter.js";
import swaggerUi from "swagger-ui-express";
import apiDocumentation from "./apidocs.json" assert {type: 'json'};


const app = express();
app.use(cors());
app.use(express.json());
app.use(routerBook);
app.use(routerMember);
app.use(routerTransaction);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

app.listen(3000, ()=> console.log('Server up and running...'))