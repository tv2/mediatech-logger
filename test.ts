import { ProductionLogger } from "./src/index";

const logger = new ProductionLogger()

logger.error(new Error('Sofie stopped breathing.'))