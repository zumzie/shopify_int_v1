// I don't go on the dark web and mentally held hostage
// electronic harrassment

require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;

const { Mapper } = require('./mapper/mapper.js');
const { Aggregator } = require('./aggregator.js');

const {
    ShopifyGraphQL,
    ShopifyProductsQL,
} = require('./shopifyQL.js');

const {
    ShopifyREST,
    ShopifyProductsREST,
} = require('./shopifyREST.js');

async function writeFile(fileName, data) {
    try {
        await fs.writeFile(fileName, JSON.stringify(data, null, 4));
        console.log('Data successfully written');
    } catch (error) {
        console.error(`Error writing to file: ${error.message}`);
    }
}

async function writeCSVFile(fileName, data) {
    const csvWriter = createCsvWriter({
        path: fileName,
        header: Object.keys(data[0]).map(key => ({id: key, title: key}))
    });

    try {
        await csvWriter.writeRecords(data);
        console.log('Data successfully written to CSV');
    } catch (error) {
        console.error(`Error writing to file: ${error.message}`);
    }
}


async function readFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading file:", filePath, error);
        throw error;
    }
}

(async () => {
    try {
        // Temporary variables for auth, will create class to call shopify data from 1password
        const storeUrl = process.env.STORE_URL;
        const accessToken = process.env.API_TOKEN;

        // Shopify Version
        const shopifyVersion = process.env.API_VER;

        var shopifyProductsREST = new ShopifyProductsREST(accessToken, storeUrl, shopifyVersion);

        const getProductsIds = await shopifyProductsREST.getProductsIds();
        
        console.log(getProductsIds);

        const filePath = 'test_folder/products.json';
        const test = await readFile(filePath);

        const shopProd = await readFile('test_folder/shopify_prod.json');
        
        const sku_test = await readFile('test_folder/skus.json');
        const price_test = await readFile('test_folder/prices.json');

    
        //const aggregatedData = await dataAggregator.aggregateProducts(shopProd);


        //await writeCSVFile('prods.csv', 'test_folder/shopify_prod.json');




        //const mappedProducts = await dataMapper.mapProducts(aggregatedData);
        //const mappedSkus = await dataMapper.mapSkus(aggregatedData);
        //const mappedPrices = await dataMapper.mapPrices(price_test);

    } catch (error) {
        console.error('Error:', error); // Proper error logging
    }
})();
