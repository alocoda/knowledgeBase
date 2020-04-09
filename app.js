const bodyParser = require('body-parser');
const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const { v4: uuid } = require('uuid');
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
    genid: function(req) {
        return uuid();
    },
    secret: 'meow meow mix',
    resave: false,
    saveUninitialized: true
}));

app.engine('hbs', expressHbs({
    layoutsDir: 'views/layouts',
    defaultLayout: 'main',
    extname: 'hbs'
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(routes);

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
});