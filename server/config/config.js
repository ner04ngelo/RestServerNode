//==========
///Puerto
//==========
process.env.PORT = process.env.PORT || 3000;

//==========
///Entorno
//==========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========
///URL Mongo
//==========
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

//==========
/// Vencimiento del Token
//==========
//60 segundos
//60 minutos
//24 horas
//30 días

process.env.CADUCIDAD_TOKEN = '48h';

//==========
///SEED de autenticación
//==========

process.env.SEED = process.env.SEED || 'secret';


//====================
// Google Client ID
//====================


process.env.CLIENT_ID = process.env.CLIENT_ID || '378481070485-p6e3uegrd4kpaq48dnedbjv6vrsmjm64.apps.googleusercontent.com';