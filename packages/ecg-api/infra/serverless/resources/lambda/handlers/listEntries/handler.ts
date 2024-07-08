
import { ListEntriesController, ListEntriesResponse } from "../../../../../controllers/listEntries/listEntries.controller";
import { DynamooseDBRepository as ECGRepository } from "../../../../../repositories/dynamodb/dynamodb.repository";

// serverless invoke local -f listECGEntries -s production -p infra\serverless\resources\lambda\handlers\listEntries\mock.json
export const main = async (event: any): Promise<ListEntriesResponse> => {
    console.log('entry', { event });
    const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    console.log(eventBody);
    const controller = new ListEntriesController(new ECGRepository());

    return controller.handleListEntries(eventBody.ecgData);
}