import { Application } from "./application/App.js";
import { Logger } from "./application/Logging.js";

const port = 3000;

Application.listen(port, () => {
    Logger.info("App started");
    Logger.info(`Running on port ${port}`);
});