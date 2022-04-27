// Express - Path
const express = require('express');
const path = require('path');

// APP
const app = express();

// Views - Html
const indexHtml = path.join(__dirname, 'views/index.html')

// Public
const publicPath = path.join(__dirname, 'public/');



// Puertos
app.listen(3000,()=>{
    console.log('SyntaxError');
});

app.use(express.static(publicPath));

app.get('/', (req,res) => {
    res.sendFile(indexHtml)
})