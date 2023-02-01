const express = require('express');
const http = require('http');
const app = express();

// Base URL for the API
//const base_url = "https://api.example.com";
const base_url = "http://localhost:3000";

// Set the template engine
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    http.get(base_url + '/books', (response) => {
        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });
        response.on('end', () => {
            res.render("books", { books: JSON.parse(data) });
        });
    }).on("error", (err) => {
        console.error(err);
        res.status(500).send('Error');
    });
});

app.get("/book/:id", (req, res) => {
    http.get(base_url + '/books/' + req.params.id, (response) => {
        let data = '';
        response.on('data', (chunk)=> {
            data += chunk;
            });
            response.on('end', () => {
            res.render("book", { book: JSON.parse(data) });
            });
            }).on("error", (err) => {
            console.error(err);
            res.status(500).send('Error');
            });
            });
            
            app.get("/create", (req, res) => {
            res.render("create");
            });
            
            app.post("/create", (req, res) => {
            const options = {
            hostname: base_url,
            path: '/books',
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
            };
            const request = http.request(options, (response) => {
            if (response.statusCode === 201) {
            res.redirect("/");
            } else {
            res.status(response.statusCode).send('Error');
            }
            });
            request.write(JSON.stringify({ title: req.body.title, author: req.body.author }));
            request.end();
            });
            
            app.get("/update/:id", (req, res) => {
            http.get(base_url + '/books/' + req.params.id, (response) => {
            let data = '';
            response.on('data', (chunk) => {
            data += chunk;
            });
            response.on('end', () => {
            res.render("update", { book: JSON.parse(data) });
            });
            }).on("error", (err) => {
            console.error(err);
            res.status(500).send('Error');
            });
            });
            
            app.post("/update/:id", (req, res) => {
            const options = {
            hostname: base_url,
            path: '/books/' + req.params.id,
            method: 'PUT',
            headers: {
            'Content-Type': 'application/json'
            }
            };
            const request = http.request(options, (response) => {
            if (response.statusCode === 200) {
            res.redirect("/book/" + req.params.id);
            } else {
            res.status(response.statusCode).send('Error');
            }
            });
            request.write(JSON.stringify({ title: req.body.title, author: req.body.author }));
            request.end();
            });
            
app.get("/delete/:id", (req, res) => {
            http.get(base_url + '/books/' + req.params.id, (response) => {
            if (response.statusCode === 204) {
            res.redirect("/");
            } else {
            res.status(response.statusCode).send('Error');
            }
            }).on("error", (err) => {
            console.error(err);
            res.status(500).send('Error');
            });
            });
            
app.listen(5500, () => {
                console.log('Server started on port 5500');
                });