import * as dynamoose from "dynamoose";

const schema = new dynamoose.Schema(
    {
        id: {
            type: String,
            hashKey: true,
            required: true,
        },
        deviceId: {
            type: String,
            index: {
                name: "DeviceIdIndex",
                type: "global",
            }
        },
        milivolts: {
            type: Number,
        },
        interval: Number,
        isRegular: Boolean,
        bippedAt: String,
        unBippedAt: String,
    },
    {
        timestamps: {
            "createdAt": {
                "createdAt": {
                    "type": {
                        "value": Date,
                        "settings": {
                            "storage": "iso"
                        },
                    },
                    "rangeKey": true
                }
            },
            "updatedAt": {
                "updatedAt": {
                    "type": {
                        "value": Date,
                        "settings": {
                            "storage": "iso"
                        }
                    }
                }
            }
        },
        saveUnknown: false,
    }
);

export const ECGModel = dynamoose.model(process.env.TABLE_NAME_PROD || '', schema, {
    create: false,
    throughput: {
        read: 5,
        write: 5,
    },
});