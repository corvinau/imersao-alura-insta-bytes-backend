import connectDatabase from '../config/dbconfig.js';

const connectDB = await connectDatabase(process.env.DB_CONNECTION);

export async function getAllPosts() {
  const db = connectDB.db('imersao-insta-bytes');
  const collection = db.collection('posts');

  return collection.find().toArray();
}
