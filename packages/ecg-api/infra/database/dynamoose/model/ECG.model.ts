import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
        },
        milivolts: String,
        isRegular: Boolean,
        marker: {
            type: String,
            validate: (value) => value === "on" || value === "off" || value === null
        }
    },
    {
        timestamps: true,
        saveUnknown: false,
    }
);

export const ECGModel = dynamoose.model('ecg_table', schema, {
    create: true,
    throughput: {
        read: 5,
        write: 5,
    },
});