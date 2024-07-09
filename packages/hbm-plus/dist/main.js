"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const simulator_1 = require("./simulator/simulator");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    console.log('Server is running on http://localhost:3000');
    (0, simulator_1.startSimulator)(5);
}
bootstrap();
//# sourceMappingURL=main.js.map