
import { HandlerResponse } from "../../../../../../domain/valueObjects/types";
import { ListEntriesController } from "../../../../../controllers/listEntries/listEntries.controller";
import { DynamooseDBRepository as ECGRepository } from "../../../../../repositories/dynamodb/dynamodb.repository";

// serverless invoke local -f listECGEntries -s production -p infra\serverless\resources\lambda\handlers\listEntries\mock.json
export const main = async (event: any): Promise<HandlerResponse> => {
    try {
        console.log('entry', { event });

        const eventParameters = typeof event.queryStringParameters === 'string'
            ? JSON.parse(event.queryStringParameters)
            : event.queryStringParameters;

        console.log({ eventParameters });

        const controller = new ListEntriesController(new ECGRepository());

        return controller.handleListEntries(eventParameters);
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Error retrieving data',
                error,
            }),
        };
    }
}