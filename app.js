'use strict';
import fetchNewsArticles from "./accessors/google/googleApi.js";
import checkTable from "./accessors/aws/checkTable.js"
import newItem from "./accessors/aws/newItem.js"
import dotenv from 'dotenv';
dotenv.config();

const table = process.env.NAME_TABLE;

const fetchAndSaveNewsArticles = async () => {
    // Check if table exists. If it does not exist, it is required to create a new one. 
    try {
        const chTable = checkTable(table);
    } catch (error) {
        console.error;
    }

    const options = {
        apiKey: process.env.GOOGLE_SEARCH_API_KEY,
        cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
        cr: "countryCA",
        dateRestrict: "d2",
        q: ["covid", "coronavirus"],
    };
    let paramsItems = [];

    
    // Get the news articles
    try {
        const newsArticles = await fetchNewsArticles(options);
        newsArticles[0].items.forEach((element) => {
            paramsItems.push({
                TableName: table,
                Item: {
                    "url": element.link,
                    "title": element.title,
                    "publicationName": element.snippet,
                    "date": newsArticles[1],
                }
            })
        });
    } catch (error) {
        console.error;
    }
    
    // Post news articles in database.
    try {
        const newArticle = newItem(paramsItems);
    } catch (error) {
        console.error;
    }
    
}

fetchAndSaveNewsArticles();