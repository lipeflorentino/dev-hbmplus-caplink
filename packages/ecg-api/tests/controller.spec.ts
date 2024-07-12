import { CreateEntriesController } from "../infra/controllers/createEntries/createEntries.controller";
import { Axios, Repository } from './test.helpers';

const axios = new Axios();
const repository = new Repository();
const createEntriesController = new CreateEntriesController(repository, axios);

// implementar tests
describe('testing controllers', () => {
    it('createEntries', async () => {
        const input = { deviceId: '1', milivolts: 0.2, interval: 30 };
        const response = await createEntriesController.handleCreateEntries(input);
        const parsedBody = JSON.parse(response.body)
        expect(response.statusCode).toBe(200);
        expect(parsedBody.data.deviceId).toBe('1');
        expect(parsedBody.data.milivolts).toBe(0.2);
        expect(parsedBody.data.interval).toBe(30);
        expect(parsedBody.data.isRegular).toBeTruthy()
        expect(parsedBody.data.id).toBeDefined()
        expect(parsedBody.message).toBe('created succesfully!');
    });
});