
import { ListIrregularitiesResponse, ListIrregularitiesController } from "../../../../../controllers/listIrregularities/listIrregularities.controller";
import { DynamooseDBRepository as ECGRepository } from "../../../../../repositories/dynamodb/dynamodb.repository";

// serverless invoke local -f listIrregularities -s production -p infra\serverless\resources\lambda\handlers\listIrregularities\mock.json
export const main = async (event: any): Promise<ListIrregularitiesResponse> => {
    console.log('entry', { event });
    const eventParameters = typeof event.queryStringParameters === 'string'
        ? JSON.parse(event.queryStringParameters)
        : event.queryStringParameters;
    console.log({ eventParameters });
    const controller = new ListIrregularitiesController(new ECGRepository());

    return controller.handleListIrregularities(eventParameters);
}