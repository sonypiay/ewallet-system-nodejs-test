import { application } from "./application/app.js";
import { logger } from "./application/logging.js";

const port = 3000;

application.listen(port, () => {
    logger.info("App started");
    logger.info(`Running on port ${port}`);
});