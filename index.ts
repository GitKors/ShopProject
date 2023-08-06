require('dotenv').config();
import express, { Express } from "express";
import path from 'path';
import { Connection } from "mysql2/promise";
import { initDataBase } from "./Server/services/db";
import { initServer } from "./Server/services/server";
import ShopAPI from "./Shop.Api";
import ShopAdmin from "./Shop.Admin";

export let server: Express;
export let connection: Connection;

async function launchApplication() {
    server = initServer();
    connection = await initDataBase();

    initRouter();
}

function initRouter() {
    const shopApi = ShopAPI(connection);
    server.use("/api", shopApi);

    const shopAdmin = ShopAdmin();
    server.use("/admin", shopAdmin);

    //React
    const clientBuildPath = path.join(__dirname, 'shop-client', 'build');
    server.use(express.static(clientBuildPath));


    server.use('*', (req, res) => {
        res.sendFile(path.join(clientBuildPath, 'index.html'));
    });
}

launchApplication();


