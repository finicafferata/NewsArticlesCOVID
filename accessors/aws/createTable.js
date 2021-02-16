import AWS from "aws-sdk";
import dotenv from 'dotenv';
dotenv.config();

AWS.config.update({ region: "us-east-2" });

var dynamodb = new AWS.DynamoDB();

const tableName = process.env.NAME_TABLE;

const createTable = async (tableName) => {
    const params = {
        TableName: tableName,
        KeySchema: [
            { AttributeName: "url", KeyType: "HASH" },
            { AttributeName: "title", KeyType: "RANGE" },
        ],
        AttributeDefinitions: [
            { AttributeName: "url", AttributeType: "S" },
            { AttributeName: "title", AttributeType: "S" },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }
    const table = dynamodb.createTable(params, (err, data) => {
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    });
};

createTable(tableName);