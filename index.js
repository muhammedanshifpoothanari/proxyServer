const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({});
const dotenv = require('dotenv');
dotenv.config();
const Port = process.env.PORT;
const proxyMappings = {
    'users': `${process.env.USERS}`,
    'loads': `${process.env.LOADS}`,
    'trucks': `${process.env.TRUCKS}`,
    'wareHouse': `${process.env.WAREHOUSE}`,
    'rabit': `${process.env.RABBIT}`
};



app.use((req, res, next) => {
    const parts = req.url.split('/');
    const firstPart = parts[1].trim();
   
    const target = proxyMappings[req.url.split('/')[1]];
    

    if (target) {
      
        req.url = req.url.replace(req.baseUrl,'');
      

        proxy.web(req, res, { target });
    } else {
        next(); 
    }
});


app.use((_req, res) => {
    res.status(404).send('Not Found');
});

app.listen(Port, () => {
    console.log('Reverse proxy server listening on port 3001');
});
