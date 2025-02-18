import { HandlerResponse } from "../../../../../../domain/valueObjects/types";
import { AxiosAdapter } from "../../../../../adapter/axios.adapter";
import { CreateEntriesController } from "../../../../../controllers/createEntries/createEntries.controller";
import { DynamooseDBRepository as ECGRepository } from "../../../../../repositories/dynamodb/dynamodb.repository";

// serverless invoke local -f createECGEntries -s production -p infra\serverless\resources\lambda\handlers\createEntries\mock.json
export const main = async (event: any): Promise<HandlerResponse> => {
    try {
        console.log('entry', { event });
        const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        console.log(eventBody);
        const controller = new CreateEntriesController(new ECGRepository(), new AxiosAdapter());

        return controller.handleCreateEntries(eventBody.ecgData);
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Failed to create!',
                error,
            }),
        };
    }
}