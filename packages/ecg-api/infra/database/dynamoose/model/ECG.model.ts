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
        interval: Number,
        milivolts: Number,
        isRegular: Boolean,
        marker: {
            type: String,
            enum: ['on', 'off'],
            required: false,
        }
    },
    {
        timestamps: {
            "createdAt": {
                "createdAt": {
                    "type": {
                        "value": Date,
                        "settings": {
                            "storage": "iso"
                        }
                    }
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

export const ECGModel = dynamoose.model(process.env.TABLE_NAME || '', schema, {
    create: true,
    throughput: {
        read: 5,
        write: 5,
    },
});