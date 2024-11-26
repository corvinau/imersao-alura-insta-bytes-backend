import express from 'express';

const posts = [
  {
    id: 1,
    description: 'uma foto de gato',
    image: 'https://placecats.com/millie/300/150',
  },
  {
    id: 2,
    description: 'um gato fazendo yoga',
    image: 'https://placecats.com/millie/300/150',
  },
  {
    id: 3,
    description: 'um gato fazendo panqueca',
    image: 'https://placecats.com/millie/300/150',
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

function getPostById(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get('/posts/:id', (req, res) => {
  const index = getPostById(req.params.id);

  res.status(200).json(posts[index]);
});
