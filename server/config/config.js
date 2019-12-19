//==========
///Puerto
//==========
process.env.PORT = process.env.PORT || 3000;

//==========
///Entorno
//==========

process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

//==========
///Entorno
//==========
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {

    urlDB = 'mongodb+srv://nero:Nexus-1234@cluster0-fajyp.mongodb.net/cafe';
}

process.env.URLDB = urlDB;