import { config } from "dotenv";
import Client from "./client/client";
config();

new Client({ owners: ["304986851310043136"] }).start();
