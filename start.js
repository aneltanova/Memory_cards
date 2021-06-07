const express = require('express')
const app = new express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session');
const flash = require('connect-flash');

const mainPageController = require('./controllers/mainPage')
const aboutPage = require('./controllers/aboutpage')

const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const updateImageController = require('./controllers/updateUserImage')

const newCardController = require('./controllers/newCard')
const storeCardController = require('./controllers/storeCard')
const removeCardController = require('./controllers/removeCard')

const validateMiddleware = require("./middleware/validateMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')

app.use(fileUpload())

mongoose.connect('mongodb://localhost/memcard', { useNewUrlParser: true });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.listen(8888, () => {
    console.log('App listening on port 8888')
})

app.use(expressSession({
    secret: 'who cares?'
}))

global.loggedIn = null;

app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.use(flash());

app.get('/', redirectIfAuthenticatedMiddleware, loginController)
app.get('/index', mainPageController)
app.get('/about', aboutPage)
app.get('/register', redirectIfAuthenticatedMiddleware, newUserController)
app.get('/login', redirectIfAuthenticatedMiddleware, loginController)
app.get('/auth/logout', logoutController)
app.get('/create', authMiddleware, newCardController)

app.post('/index/update', authMiddleware, updateImageController)
app.post('/register/action', redirectIfAuthenticatedMiddleware, storeUserController)
app.post('/login/action', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/cards/store', authMiddleware, storeCardController)
app.post('/cards/remove', authMiddleware, removeCardController)