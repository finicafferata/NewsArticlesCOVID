import AWS from "aws-sdk";

AWS.config.update({ region: "us-east-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

console.log("Adding a new item...");
const newItem = (paramsItems) => {
    paramsItems.forEach(element => {
        docClient.put(element, (err, data) => {
            if (err) {
                console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Added item:", JSON.stringify(data, null, 2));
            }
        });
    });
}

export default newItem;