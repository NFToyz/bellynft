import type { NextFunction } from 'express';
import { MongoClient } from 'mongodb';
import { ExtendedRequest, ExtendedResponse } from '.';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

let cachedClient: MongoClient;

if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  );
}

export default async function database(
  req: ExtendedRequest,
  res: ExtendedResponse,
  next: NextFunction
) {
  if (!cachedClient) {
    cachedClient = new MongoClient(String(uri));
    await cachedClient.connect();
  }

  req.dbClient = cachedClient;
  req.db = cachedClient.db(dbName);

  return next();
}
