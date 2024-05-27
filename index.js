import express from"express"; 
import cors from "cors"; 
import ProvinceRouter from "./src/controllers/province_controller.js" 
import EventRouter from "./src/controllers/event_controller.js"
import LocationRouter from "./src/controllers/location_controller.js"
import EventCategoryRouter from "./src/controllers/category_controller.js"
import UserRouter from "./src/controllers/user_controller.js"

const app = express();
const port = 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/provinces", ProvinceRouter);
app.use("/api/events", EventRouter);
app.use("api/locations", LocationRouter);
app.use("api/event_category", EventCategoryRouter);
app.use("api/users", UserRouter);

//Inicio el server y lo pongo a escuchar
app.listen(port, () => {
    console.log(`Example app listening on por ${port}`)
});