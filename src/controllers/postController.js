import fs from 'fs';

import { addNewPost, getAllPosts } from '../models/postModel.js';

export async function listPosts(req, res) {
  const posts = await getAllPosts();

  res.status(200).json(posts);
}

export async function sendNewPost(req, res) {
  const newPost = req.body;

  try {
    const post = await addNewPost(newPost);

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}

export async function uploadNewImage(req, res) {
  const newPost = {
    description: '',
    imageUrl: req.file.originalname,
    alt: '',
  };

  try {
    const post = await addNewPost(newPost);
    const imageUpdate = `uploads/${post.insertedId}.jpg`;
    fs.renameSync(req.file.path, imageUpdate);

    res.status(200).json(post);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}
