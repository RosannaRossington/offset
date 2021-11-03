import express from 'express';
import {getMaterials, getMaterialById, createMaterial, getMaterialByMaterial} from './queries.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.get('/materials', getMaterials)
app.get('/materials/:material', getMaterialByMaterial)
app.get('/materials/:id', getMaterialById)
app.post('/materials', createMaterial)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})