//value of express package 
const express = require('express');
// and initialize
const app = express()
const PORT = 8080;

//apply middleware
app.use(express.json())
//fire up api on server
app.listen(PORT, () => console.log(`Running on ${PORT}`));
