import app from './app.js';
import connectDB from './database.js';

//Inicializar el servidor
app.listen(3000, () => {
    connectDB();
});