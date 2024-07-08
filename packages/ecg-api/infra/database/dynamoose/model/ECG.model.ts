import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
        },
        milivolts: Number,
        isRegular: Boolean,
        marker: {
            type: String,
            enum: ['on', 'off'],
            required: false,
        }
    },
    {
        timestamps: true,
        saveUnknown: false,
    }
);

export const ECGModel = dynamoose.model(process.env.TABLE_NAME || '', schema, {
    create: true,
    throughput: {
        read: 5,
        write: 5,
    },
});