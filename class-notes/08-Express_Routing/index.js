'use strict';


/* ------------------------------------------------- *
                    Express & Routing
/* ------------------------------------------------- */

// https://expressjs.com/

// Initial commands;
//* npm init -y
//* npm i -D nodemon
//* npm i express dotenv
//* echo PORT=8000 > .env
//* add .gitigore file

// Express Start
const express = require('express'); // Assign expressFramwrok to express vairable.
const app = express(); // Run application on express.

// Env
require('dotenv').config();
const PORT = process.env?.PORT || 8000
/* ------------------------------------------------- *

//* HTTP_METHODS & URLS:
// app.get('/', (req, res) => res.end("called in 'get' method "));
// app.post('/', (req, res) => res.end("called in 'post' method "));
// app.put('/', (req, res) => res.end("called in 'put' method "));
// app.patch('/', (req, res) => res.end("called in 'patch' method "));
// app.delete('/', (req, res) => res.end("called in 'delete' method "));

// runs for all methods
// app.all('/', (req, res) => res.end("called in 'all' method "));

// app.route('/')
app.route('/')
    .get((req, res) => res.send({ method: 'GET' }))
    .post((req, res) => res.send({ method: 'POST' }))
    .put((req, res) => res.send({ method: 'PUT' }))
    .delete((req, res) => res.send({ method: 'DELETE' }));

/* ------------------------------------------------- *
//* URL (Path) Options;
app.get('/', (req, res) => res.send("in 'root' path")); // '/' == root
app.get('/path', (req, res) => res.send("in path")); // '/' == root
// express-ulrs supported JokerChar;
app.get('/abc(x?)123', (req, res) => res.send("in abc(x?)123")); // abc123 or abcx123
app.get('/abc(x+)123', (req, res) => res.send("in abc(x+)123")); // abc123 or abcx.....123
app.get('/abc(*)123', (req, res) => res.send("in abc(*)123")); // abc123 or abcx.....123
// express-ulrs supported regexp;
app.get(/xyz/, (req, res) => res.send("in /xyz/")); // url contains = 'xyz'
app.get(/^\/xyz/, (req, res) => res.send("in /^xyz/")); // url starWith = 'xyz'
app.get(/xyz$/, (req, res) => res.send("in /xyz$/")); // url endWith = 'xyz'

/* ------------------------------------------------- *
//* URL Parameters;

app.get('/blogs/:blogId/:author/search', (req, res) => {

    // console.log(req); // req is an object and you can access variable or functions by '.'

    res.send({
        params: req.params,
        blogId: req.params.blogId,
        author: req.params.author,
        queries: req.query,
        title: req.query.title,
        url: {
            protocol: req.protocol,
            subdomain: req.subdomains,
            hostname: req.hostname,
            path: req.path,
            originalUrl: req.originalUrl
        }
    });
});

/* ------------------------------------------------- *
//* Response Methods;

// Informational responses (100 – 199)
// Successful responses (200 – 299)
// Redirection messages (300 – 399)
// Client error responses (400 – 499)
// Server error responses (500 – 599)

app.get('/', (req, res) => {

    // res.sendStatus(201); // Cannot set headers after they are sent to the client

    // res.status(401);

    // res.send({
    //     message: "Response Methods"
    // });

    // ShortHand usage of res.status()
    res.status(202).send({
        message: "Response Methods"
    });
});

/* ------------------------------------------------- */
//* Extras methods;

// Download File
app.get('/download', (req, res) => res.download('./index.js', 'algulumvergulum.js'));

// todo upload file ? 
// todo redirect ? 



/* ------------------------------------------------- */
app.listen(PORT, () => console.log('Running at: http://127.0.0.1:' + PORT));
