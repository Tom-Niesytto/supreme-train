import mysql from 'mysql';
import { db } from '../db';

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        const { results } = await db.query('SELECT * FROM listings');
        return results;
    }
}