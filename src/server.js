import Hapi from '@hapi/hapi';
import mysql from 'mysql';
import { db } from './db';
import { getAllListingsRoute } from './routes/getAllListings';
import { getListingRoute } from './routes/getListing';

const start = async () => {
    const server = Hapi.server({
        port: '8000',
        host: 'localhost',
    });

    server.route(getAllListingsRoute);
    server.route(getListingRoute);

    db.connect();
    await server.start();
    console.log(`Server is listening on ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.stop({ timeout: 10000 });
    db.end();
    console.log('Server stopped');
    process.exit(0);
});

start();