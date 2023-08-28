import express from 'express';
import ProductManager  from './productManager.js';

const app = express();
app.use(express.urlencoded({extended:true}))

const a = new ProductManager();

app.get("/products", async (req, res) => {

    const limit = req.query.limit;
    const products = await a.getProducts();
    res.send(products.slice(0,limit));
});

app.get("/products/:pid", async (req, res) => {

    const pid= req.params.pid;
    const products = await a.getProducts();
    res.send(products.filter(elem => elem.id == pid));
});

app.listen(8080, () => console.log("servidor corriendo en el puerto 8080"));

