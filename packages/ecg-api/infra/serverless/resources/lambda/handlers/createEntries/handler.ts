import { CreateEntriesResponse, CreateEntriesController } from "../../../../../controllers/createEntries/createEntries.controller";
import { DynamooseDBRepository as ECGRepository } from "../../../../../repositories/dynamodb/dynamodb.repository";

// serverless invoke local -f createECGEntries -s production -p infra\serverless\resources\lambda\handlers\createEntries\mock.json
export const main = async (event: any): Promise<CreateEntriesResponse> => {
    console.log('entry', { event });
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    console.log(eventBody);
    const controller = new CreateEntriesController(new ECGRepository());

    return controller.handleCreateEntries(eventBody.ecgData);
}