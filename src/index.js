const express = require('express');
const app = express();
const {PORT, DB_URL} = require("./config");
const {ConnectDB} = require("./Infra")

const cors = require('cors');

const {UserRoutes, MarketPlaceRoutes, GroupRoutes, OrderRoutes} = require("./UseCases/index")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(
    cors({
      origin: ["http://localhost:5174", "http://localhost:5173"],
      credentials: true,
      methods: ["GET", "POST", "PATCH", "DELETE"],
    })
);

ConnectDB(DB_URL);

app.use("/user", UserRoutes)
app.use("/group", GroupRoutes)
app.use("/market-place", MarketPlaceRoutes)
app.use("/order", OrderRoutes)

app.listen(PORT, ()=>console.log(`app serving at port ${PORT}`));
