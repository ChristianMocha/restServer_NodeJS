

// ==========================
// Puerto
// ==========================

process.env.PORT = process.env.PORT || 3000;

// ==========================
// Entorno
// ==========================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ==========================
// BD
// ==========================

let urlBD;
if (process.env.NODE_ENV === 'dev') {
    urlBD = 'mongodb://localhost:27017/restaurant';
    console.log('Entrando al entorno de desarrollo local');
}else{
    urlBD = 'mongodb+srv://crissmochaz:HTeI1qMRqyy0dyW4@restaurant.x2z5syf.mongodb.net/restaurant';   
    console.log('Entrando al entorno de desarrollo en la nube');
}

process.env.URLDB = urlBD;
