import express from 'express';
import multer from 'multer';

import {
  listPosts,
  sendNewPost,
  uploadNewImage,
} from '../controllers/postController.js';

// windows
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });

// const upload = multer({ dest: './uploads', storage });

// linux e mac
const upload = multer({ dest: './uploads' });

const routes = (app) => {
  app.use(express.json());

  app.get('/posts', listPosts);
  app.post('/posts', sendNewPost);
  app.post('/upload', upload.single('image'), uploadNewImage);
};

export default routes;
