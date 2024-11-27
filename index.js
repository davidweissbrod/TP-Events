import express from "express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province-controller.js" 
import EventRouter from "./src/controllers/event-controller.js"
import LocationRouter from "./src/controllers/location-controller.js"
import EventCategoryRouter from "./src/controllers/category-controller.js"
import UserRouter from "./src/controllers/user-controller.js"
import EventLocationRouter from "./src/controllers/category-controller.js"

const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/provinces", ProvinceRouter);
app.use("/events", EventRouter);
app.use("/locations", LocationRouter);
app.use("/event-category", EventCategoryRouter);
app.use("/users", UserRouter);
app.use("/event-location", EventLocationRouter)

//Inicio el server y lo pongo a escuchar
app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
});