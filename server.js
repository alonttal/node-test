const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', err => console.log('Unable to append to log file!'));
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs',{
//         pageTitle: 'Maintenance',
//         maintanenceMessage: `We are currently under maintenance...`
//     });
// });

app.use(express.static(__dirname + '/public')); //register middleware

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (request, response) => {
    response.render('home.hbs',{
        pageTitle: 'Home',
        welcomeMessage: `Welcome to My Site!`
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs',{
        pageTitle: 'About',
    });
});

app.get('/bad', (request, response) => {
    response.send({
        error: 'Error handling request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});