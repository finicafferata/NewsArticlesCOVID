'use strict';
import { google } from 'googleapis';
const customsearch = google.customsearch('v1');

const fetchNewsArticles = async (options) => {
    const res = await customsearch.cse.list({
        auth: options.apiKey,
        cx: options.cx,
        cr: options.cr,
        dateRestrict: options.dateRestrict,
        q: options.q,
    });
    const resultsPlusDate = [res.data, res.headers.date]
    return resultsPlusDate;
}

export default fetchNewsArticles;