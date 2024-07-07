"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// infra/serverless/resources/lambda/handlers/createEntries/handler.ts
var handler_exports = {};
__export(handler_exports, {
  main: () => main
});
module.exports = __toCommonJS(handler_exports);

// application/dto/createEntriesInput.dto.ts
var CreateEntriesInputDTO = class {
  constructor(id, milivolts, interval) {
    this.id = id;
    this.milivolts = milivolts;
    this.interval = interval;
  }
};

// domain/entities/ECG.entity.ts
var ECG = class {
  constructor(id, milivolts, interval) {
    this.id = id;
    this.milivolts = milivolts;
    this.isRegular = false;
    this.marker = null;
    this.interval = interval;
  }
  detectIrregularities() {
    console.log("Analysing ECG measure...");
    const x = this.interval;
    const y = -0.06366 + 0.12613 * Math.cos(Math.PI * x / 500) + 0.12258 * Math.cos(Math.PI * x / 250) + 0.01593 * Math.sin(Math.PI * x / 500) + 0.03147 * Math.sin(Math.PI * x / 250);
    const lowerBound = y * 0.8;
    const upperBound = y * 1.2;
    if (this.milivolts >= lowerBound && this.milivolts <= upperBound) {
      console.log("This measure is irregular.");
      this.setIsRegular(false);
    } else {
      this.setIsRegular(true);
    }
  }
  setIsRegular(value) {
    this.isRegular = value;
  }
  setMarker(value) {
    this.marker = value;
  }
};

// application/dto/createEntriesOutput.dto.ts
var CreateEntriesOutputDTO = class {
  constructor(id, milivolts, interval, isRegular) {
    this.id = id;
    this.milivolts = milivolts;
    this.interval = interval;
    this.isRegular = isRegular;
  }
};

// application/useCase/createEntries/createEntries.useCase.ts
var CreateEntriesUseCase = class {
  constructor(ecgRepository) {
    this.ecgRepository = ecgRepository;
  }
  async execute(input) {
    const ecg = new ECG(input.id, input.milivolts, input.milivolts);
    ecg.detectIrregularities();
    this.ecgRepository.save(ecg);
    return new CreateEntriesOutputDTO(ecg.id, ecg.milivolts, ecg.interval, ecg.isRegular);
  }
};

// infra/controllers/createEntries/createEntries.controller.ts
var CreateEntriesController = class {
  constructor(ecgRepository) {
    this.ecgRepository = ecgRepository;
    this.createEntriesUseCase = new CreateEntriesUseCase(this.ecgRepository);
  }
  async handleCreateEntries(input) {
    const ecg = await this.createEntriesUseCase.execute(
      new CreateEntriesInputDTO(input.id, input.milivolts, input.interval)
    );
    return {
      status: 201,
      data: ecg,
      message: "created succesfully!"
    };
  }
};

// infra/repositories/mockdb/mockdb.repository.ts
var MockDBRepository = class {
  async save(ecg) {
    console.log("salvo com sucesso", { ecg });
  }
  async getHistory(deviceId) {
    console.log("listando resultados do device", { deviceId });
    const ecg_1 = new ECG({ id: "1", milivolts: 100, interval: 1 });
    return [ecg_1];
  }
};

// infra/serverless/resources/lambda/handlers/createEntries/handler.ts
var main = async (event, context, callback) => {
  console.log("entry", { event, context, callback });
  const controller = new CreateEntriesController(new MockDBRepository());
  return controller.handleCreateEntries(event.body.ecgData);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  main
});
//# sourceMappingURL=handler.js.map
