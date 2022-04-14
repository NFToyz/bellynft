import { Db, MongoClient } from 'mongodb';
import { IncomingMessage, ServerResponse } from 'http';

export { default as database } from './database';
export { default as all } from './all';

export interface ExtendedRequest extends IncomingMessage {
  dbClient: MongoClient;
  db: Db;
}

export interface ExtendedResponse extends ServerResponse {
  cookie(name: string, value: string): void;
}
