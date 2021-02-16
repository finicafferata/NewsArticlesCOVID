import AWS from "aws-sdk";
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
            throw new Error ("Please create a new table by executing 'node accessors/aws/createTable.js' in your console");
        }
        else {
            status = "true";
            console.log('Table exists', data);
        }
    });
    return status;
}

export default checkTable;