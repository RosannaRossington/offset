//value of express package 
const express = require('express');
// and initialize
const app = express()
const PORT = 8080;

//apply middleware
app.use(express.json())
//fire up api on server
app.listen(PORT, () => console.log(`Running on ${PORT}`));

// app.get('/poses', (req, res) => {
//   //callback to handle request
//   res.status(200).send({
//     tshirt: '',
//     size: 'xl',
//   });
// });

// //dynamic url params a represenation to handle all diffetent in a function
// app.post('/classes/:id', (req, res) => {
//   const { id } = req.params;
//   const { logo } = req.body;
//   //express does not parse json as default 
//   //need middleware to tell express to parse json bedofre data hits the function to handle request 

//   if (!logo) {
//     res.status(418).send({ message: 'We need a logo' });
//   }
//   res.send({
//     tshirt: `${logo} ${id}`,
//   });
// });
