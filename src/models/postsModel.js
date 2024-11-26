import 'dotenv/config';
import { ObjectId } from 'mongodb';

import connectDatabase from '../config/dbconfig.js';

const connectDB = await connectDatabase(process.env.DB_CONNECTION);

export async function getAllPosts() {
  const db = connectDB.db('imersao-insta-bytes');
  const collection = db.collection('posts');

  return collection.find().toArray();
}

export async function addNewPost(newPost) {
  const db = connectDB.db('imersao-insta-bytes');
  const collection = db.collection('posts');

  return collection.insertOne(newPost);
}

export async function updatePost(id, newPost) {
  const db = connectDB.db('imersao-insta-bytes');
  const collection = db.collection('posts');
  const objId = ObjectId.createFromHexString(id);

  return collection.updateOne({ _id: new ObjectId(objId) }, { $set: newPost });
}
