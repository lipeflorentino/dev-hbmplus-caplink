"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiveSignalController = void 0;
const common_1 = require("@nestjs/common");
let ReceiveSignalController = class ReceiveSignalController {
    receiveSignal(body) {
        const { signal } = body;
        if (signal === 'bip' || signal === 'bipbip') {
            console.log(`Received signal: ${signal}`);
            return `Signal received: ${signal}`;
        }
        return 'Invalid signal';
    }
};
exports.ReceiveSignalController = ReceiveSignalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], ReceiveSignalController.prototype, "receiveSignal", null);
exports.ReceiveSignalController = ReceiveSignalController = __decorate([
    (0, common_1.Controller)('receive-signal')
], ReceiveSignalController);
//# sourceMappingURL=receive-signal.controller.js.map