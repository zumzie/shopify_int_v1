require('dotenv').config();
const axios = require('axios');
const fs = require('fs').promises;

const { Mapper } = require('./mapper.js');

async function writeFile(fileName, data) {
    try {
        await fs.writeFile(fileName, JSON.stringify(data, null, 4));
        console.log('Data successfully written');
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
        const dataMapper = new Mapper(); // Correct instantiation
        const filePath = 'test_folder/products.json';
        const test = await readFile(filePath);
        const sku_test = await readFile('test_folder/skus.json');
        const price_test = await readFile('test_folder/prices.json');

        const mappedProducts = await dataMapper.mapProducts(test);
        const mappedSkus = await dataMapper.mapSkus(sku_test);
        const mappedPrices = await dataMapper.mapPrices(price_test);

        console.log(mappedPrices);

    } catch (error) {
        console.error('Error:', error); // Proper error logging
    }
})();
