const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs} = request.body

  const repository = { id: uuid(), title, url, techs, likes: 0}

  repositories.push(repository)

  return response.json(repository)
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const { title, url, techs} = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)

  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found."})
  }
  //pego o numero de likes, coloco dentro da variável likes assim tenho não apago o numero de likes
  const likes = repositories[repositoryIndex].likes
  const repository = {
    id, title, url, techs, likes
  }

  repositories[repositoryIndex] = repository

  return response.json(repository)
});

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if(repositoryIndex < 0){
    return res.status(400).json({ error: "Repository not found."})
  }

  repositories.splice(repositoryIndex, 1)
  
  return res.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id)
  
  if(repositoryIndex < 0){
    return response.status(400).json({ error: "Repository not found."})
  }

  const like = repositories[repositoryIndex].likes + 1

  repositories[repositoryIndex].likes = like

  const repository= repositories[repositoryIndex]
  

  return response.json(repository)
});

module.exports = app;
