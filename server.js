import express from 'express';

const posts = [
  {
    descricao: 'uma foto teste',
    imagem: 'https://placecats.com/millie/300/150',
  },
  {
    descricao: 'gato fazendo yoga',
    imagem: 'https://placecats.com/millie/300/150',
  },
  {
    descricao: 'gato fazendo panqueca',
    imagem: 'https://placecats.com/millie/300/150',
  },
  {
    descricao: 'gato olhando pela janela',
    imagem: 'https://placecats.com/millie/300/150',
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Servidor escutando...');
});

app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});
