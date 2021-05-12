import { config } from "dotenv";
import Client from "./client/client";
config();

new Client().start();
