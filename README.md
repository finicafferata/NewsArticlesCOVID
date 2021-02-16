# News Articles about COVID
Using Google Search API, fetch all news articles about COVID which were published in Canada over the past two days.

## Setting up the program:
Before starting, make sure to have a API Key for Google and to set up the Custom Search JSON API depending on the requirements (https://developers.google.com/custom-search/v1/reference/rest/v1/cse/list):
    cx: your search engine ID,
    cr: "countryCA",
    dateRestrict: "d2",
    q: ["covid", "coronavirus"]

Afterwards, you need to have an account in AWS to be able to use the free tier of DynamoDB. You will need to configurate your credentials. Follow the instructions here: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html

Finally, in your .env document, include your Google API Key and your table name. You can see its example. 

## Executing the program:
First, you will need to create your table. For that, you can run "node accessors/aws/createTable.js" in your console or create it in DynamoDB website.

Second, you have to run "node app.js" to fetch the news articles and then store the information needed in your table. 
