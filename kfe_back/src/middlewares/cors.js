import cors from 'cors';

const ACCEPTED_ORIGINS = [
        'http://localhost:5173',
        'http://localhost:8080',
        'http://192.168.1.112:8080'
    ];

export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS} = {}) => cors({
    origin:(origin, callback) => {
     //esto es para permitir que el frontend pueda hacer solicitudes al backend, y solo permitir solicitudes desde el puerto 5173, que es el puerto donde se ejecuta el frontend
        if(ACCEPTED_ORIGINS.includes(origin) || !origin){
            return callback(null, true); //si el origen de la solicitud esta en la lista de orígenes aceptados, o si no hay un origen (lo que puede pasar en algunas solicitudes), entonces se permite la solicitud
        }

        if(!origin) {
            return callback(null, true); //si no hay un origen, se permite la solicitud
        }

        return callback(new Error('Origin not allowed')); //si el origen de la solicitud no esta en la lista de orígenes aceptados, entonces se rechaza la solicitud
     }
})