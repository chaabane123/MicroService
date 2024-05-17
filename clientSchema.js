const fs = require('fs')
const path = require('path')
const {buildSchema} = require("graphql")
const {promisify} = require('util')
const readFileAsync = promisify(fs.readFile)

async function getClientSchema (){


    const schemaPath= path.join('client.gql');
    try{
        const schemaString = await readFileAsync(schemaPath,{
            encoding: 'utf-8'
        })
        return buildSchema(schemaString)






    }catch (error) {}

    console.error("Error ",error)
    throw error;
}

module.exports = getClientSchema