import { CreateEntriesUseCase } from "../application/useCase/createEntries/createEntries.useCase";
import { ListEntriesUseCase } from "../application/useCase/listEntries/listEntries.useCase";
import { ListIrregularitiesUseCase } from "../application/useCase/listIrregularities/listIrregularities.useCase";
import { CreateEntriesInputDTO } from "../application/dto/createEntries/createEntriesInput.dto";
import { ListEntriesInputDTO } from "../application/dto/listEntries/listEntriesInput.dto";
import { ListIrregularitiesInputDTO } from "../application/dto/listIrregularities/listIrregularitiesInput.dto";
import { Axios, Repository } from './test.helpers';



const axios = new Axios();
const repository = new Repository();
const createEntriesUseCase = new CreateEntriesUseCase(repository, axios);
const listEntriesUseCase = new ListEntriesUseCase(repository);
const listIrregularitiesUseCase = new ListIrregularitiesUseCase(repository);

describe('testing create entries use case', () => {
    it('default', async () => {
        const input = new CreateEntriesInputDTO('1', 0.2, 30);
        const response = await createEntriesUseCase.execute(input);
        expect(response.id).toBeDefined();
        expect(response.deviceId).toBe('1');
        expect(response.interval).toBe(30);
        expect(response.milivolts).toBe(0.2);
        expect(response.isRegular).toBeTruthy();
    });

    it('check irregularities at 60 measures', async () => {
        const input = new CreateEntriesInputDTO('2', 0.2, 30);
        const response = await createEntriesUseCase.execute(input);
        expect(response.id).toBeDefined();
        expect(response.deviceId).toBe('2');
        expect(response.interval).toBe(30);
        expect(response.milivolts).toBe(0.2);
        expect(response.isRegular).toBeTruthy();
    });

    it('should bip', async () => {
        const input = new CreateEntriesInputDTO('3', 0.2, 30);
        const response = await createEntriesUseCase.execute(input);
        expect(response.id).toBeDefined();
        expect(response.deviceId).toBe('3');
        expect(response.interval).toBe(30);
        expect(response.milivolts).toBe(0.2);
        expect(response.isRegular).toBeTruthy();
    });

    it('should unbip', async () => {
        const input = new CreateEntriesInputDTO('4', 0.2, 30);
        const response = await createEntriesUseCase.execute(input);
        expect(response.id).toBeDefined();
        expect(response.deviceId).toBe('4');
        expect(response.interval).toBe(30);
        expect(response.milivolts).toBe(0.2);
        expect(response.isRegular).toBeTruthy();
    });
});

describe('testing list entries use case', () => {
    it('default', async () => {
        const input = new ListEntriesInputDTO('1', '30');
        const response = await listEntriesUseCase.execute(input);
        expect(response.ecgList).toBeDefined();
        expect(response.ecgList.length).toBe(1);
    });
});

describe('testing list irregularities use case', () => {
    it('default', async () => {
        const input = new ListIrregularitiesInputDTO('1');
        const response = await listIrregularitiesUseCase.execute(input);
        expect(response.ecgIrregularitiesList).toBeDefined();
        expect(response.ecgIrregularitiesList.length).toBe(1);
    });
});