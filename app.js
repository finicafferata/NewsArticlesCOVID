'use strict';
import fetchNewsArticles from "./googleSearch.js";
import checkTable from "./aws/checkTable.js"
import newItem from "./aws/newItem.js"
// import createTable from "./aws/createTable.js"
import dotenv from 'dotenv';
dotenv.config();

const table = process.env.NAME_TABLE;

const fetchAndSaveNewsArticles = async () => {
    const options = {
        apiKey: process.env.GOOGLE_SEARCH_API_KEY,
        cx: "0e73589d1e148a1b7",
        cr: "countryCA",
        dateRestrict: "d2",
        q: ["covid", "coronavirus"],
    };
    let paramsItems = [];
    // Get the news articles
    try {
        const newsArticles = await fetchNewsArticles(options);
        newsArticles.items.forEach((element) => {
            paramsItems.push({
                TableName: table,
                Item: {
                    "url": element.link,
                    "title": element.title,
                    "publicationName": element.snippet,
                    "date": new Date(),
                }
            })
        });
    } catch (error) {
        console.log(error);
    }
    // Check if table exists. If it does not exist, create a new one. 
    try {
        const chTable = await checkTable(table);
    } catch (error) {
        console.log(error);
    }
    try {
        console.log('paramsItemssssss', paramsItems)
        const newArticle = await newItem(paramsItems);
        console.log('newArticle', newArticle);
    } catch (error) {
        console.log(error);
    }
}

console.log(fetchAndSaveNewsArticles());