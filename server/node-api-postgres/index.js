import express from 'express';
import {getMaterials, getMaterialById, createMaterial} from './queries.js';

const app = express();
const PORT = process.env.PORT || 8080;

console.log(getMaterials, 'getMaterials')
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
// app.get('/materials', (request, response) => {
//     console.log('getMaterials');
//     pool.query('SELECT * FROM materials ORDER BY id ASC', (error, results) => {
//       if (error) {
//         throw error;
//       }
//       response.status(200).json(results.rows);
//     });
//   });

app.get('/materials/:id', getMaterialById)
app.post('/materials', createMaterial)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})