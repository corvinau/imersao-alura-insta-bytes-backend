import fs from 'fs';
import geminiGenerateDescription from '../services/geminiService.js';

import { addNewPost, getAllPosts, updatePost } from '../models/postsModel.js';

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

export async function uploadImage(req, res) {
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

export async function updateNewPost(req, res) {
  const id = req.params.id;
  const imgUrl = `http://localhost:3000/${id}.jpg`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
    const description = await geminiGenerateDescription(
      imgBuffer,
      'descrevendo'
    );
    const alt = await geminiGenerateDescription(imgBuffer, 'alternativo');

    const newPost = {
      imageUrl: imgUrl,
      description: description,
      alt: alt,
    };

    const post = await updatePost(id, newPost);

    res.status(200).json(post);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: 'Falha na requisição' });
  }
}
