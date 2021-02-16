import AWS from "aws-sdk";
import createTable from "./createTable.js"
AWS.config.update({ region: "us-east-2" });
var dynamodb = new AWS.DynamoDB();

const checkTable = (tableName) => {
    let status = "false";
    const params = {
        TableName: tableName,
    };
    dynamodb.describeTable(params, (err, data) => {
        if (err) {
            status = "false";
            console.log(err, err.stack);
        }
        else {
            status = "true";
            console.log(data);
        }
    });
    if (status === "false") {
        const crTable = createTable();
        console.log('createTableResponse', crTable)
    }
}

export default checkTable;