const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Views
const viewsIndex = path.join(__dirname, 'views/index.html')


// Static
const publicPath = path.join(__dirname, 'public/');
app.use(express.static(publicPath));

// Puertos
app.listen(port,()=>{
    console.log(`MrCoffee listening at http://localhost:${port}`)
})

app.get('/', (req,res) => {
    res.sendFile(viewsIndex)
})