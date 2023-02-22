"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = __importDefault(require("../routes/product"));
const user_1 = __importDefault(require("../routes/user"));
const product_2 = require("./product");
const user_2 = require("./user");
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3001";
        this.listen();
        this.midleware();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port " + this.port);
        });
    }
    routes() {
        this.app.use("/api/products", product_1.default);
        this.app.use("/api/users", user_1.default);
    }
    midleware() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    async dbConnect() {
        try {
            await product_2.Product.sync({ force: false });
            await user_2.User.sync({ force: false });
            console.log("Connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    }
}
exports.default = Server;
