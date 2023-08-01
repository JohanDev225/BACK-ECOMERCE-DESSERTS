import express from 'express';

const app = express();

//Importar las rutas
import Auth from './routes/User.Routes.js';
import Dessert from './routes/Dessert.Routes.js';
import Order from './routes/Order.Routes.js';
import Wishlist from './routes/Wishlist.Routes.js';

//Importar Middlewares

//Global Settings
//Vas a permitir que el servidor reciba json
app.use(express.json());

// No vas a permitir que el servidor reciba json anidados
app.use(express.urlencoded({extended: false}));

//permitir cors 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers','*');
    //accept all methods
    res.header('Access-Control-Allow-Methods','*');
    next() 
});

//Vas a permitir que el servidor reciba archivos
app.use(express.static('public'));

app.use(Auth)
app.use(Dessert)
app.use(Order)
app.use(Wishlist)

export default app;