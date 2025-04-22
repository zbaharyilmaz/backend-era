"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */

// Swagger Autogen
// https://swagger-autogen.github.io/docs/
// $ npm i swagger-autogen

/* ------------------------------------------------------- *
const options = {
    openapi:          <string>,     // Enable/Disable OpenAPI.                        By default is null
    language:         <string>,     // Change response language.                      By default is 'en-US'
    disableLogs:      <boolean>,    // Enable/Disable logs.                           By default is false
    autoHeaders:      <boolean>,    // Enable/Disable automatic headers recognition.  By default is true
    autoQuery:        <boolean>,    // Enable/Disable automatic query recognition.    By default is true
    autoBody:         <boolean>,    // Enable/Disable automatic body recognition.     By default is true
    writeOutputFile:  <boolean>     // Enable/Disable writing the output file.        By default is true
};
/* ------------------------------------------------------- */


// const swagerAutogen = require('swagger-autogen')({ openapi: '3.1.0', language: 'tr-TR' })
const swaggerAutogen = require('swagger-autogen')()

const packageJson = require('./package.json');

require('dotenv').config()

const HOST = process.env?.HOST || '127.0.0.1'
const PORT = process.env?.PORT || 8000


const document = {
    // info: {
    //     version: '1.0.0',
    //     title: 'personnel-api',
    //     description: 'Personnel Management System API Service v1',
    //     contact: { name: 'Clarusway', email: 'claruswayinfo@gmail.com' },
    //     licence: 'ISC'
    // },

    info: {
        version: packageJson.version,
        title: packageJson.name,
        description: packageJson.description,
        contact: packageJson.contact,
        licence: packageJson.license
    },

    host: HOST + ':' + PORT,
    basePath: '/',
    schemes: ['http', 'https'],
    securityDefinitions: {
        Token: {
            type: 'apiKey',
            in: 'header',
            name: 'Authorization',
            description: 'Simple Token Authentication * Example Use: <b>Token ...TokenKey...</b>',
        }
    },

    security: [{ Token: [] }],

    definitions: {
        'Department': require('./src/models/department').schema.obj,
        'Personnel': require('./src/models/personnel').schema.obj
    }
};

// To run swaggerAutgen: node swaggerAutogen.js
// swaggerAutogen(outputFile, routes, document)
swaggerAutogen('./src/configs/swagger.json', ['./index.js'], document);