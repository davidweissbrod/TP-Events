import express from"express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province_controller.js" 
import EventRouter from "./src/controllers/event_controller.js"

const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/provinces", ProvinceRouter);
app.use("/api/events", EventRouter)

//Inicio el server y lo pongo a escuchar
app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
});