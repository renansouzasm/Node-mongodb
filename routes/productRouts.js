const Product = require("../models/Product");
const router = require("express").Router();

router.post("/", async function(req, res) {
    const { studio, name, price } = req.body;

    const product = {
        studio,
        name,
        price: price.toFixed(2)
    }

    try {
        await Product.create(product);
        res.send(JSON.stringify("Produto criado com sucesso! :)"));
    } catch (error) {
        res.send(JSON.stringify("Deu errado :("));
    }
})

router.get("/", async function(req, res) {
    try {
        const products = await Product.find();
        res.send(JSON.stringify(products));
    } catch (error) {
        res.send(JSON.stringify("Deu errado :("));
    }
})

router.get("/:id", async function(req, res) {
    const id = req.params.id;
    
    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            res.send(JSON.stringify("Produto não foi encontrado! :("));
        } else {
            res.send(JSON.stringify(product));
        }        
    } catch (error) {
        res.send(JSON.stringify("Deu errado :("));
    }
})

router.patch("/:id", async function(req, res) {
    const id = req.params.id;
    const { studio, name, price } = req.body;

    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            res.send(JSON.stringify("Produto não foi encontrado! :("));
        } else {
            await Product.updateOne({ _id: id }, {
                studio,
                name,
                price
            });
            res.send(JSON.stringify("Produto alterado com sucesso! :)"));
        }        
    } catch (error) {
        res.send(JSON.stringify("Deu errado :("));
    }
})

router.delete("/:id", async function(req, res) {
    const id = req.params.id;
    
    try {
        const product = await Product.findOne({ _id: id });

        if (!product) {
            res.send(JSON.stringify("Produto não foi encontrado! :("));
        } else {
            await Product.deleteOne({ _id: id });
            res.send(JSON.stringify("Produto deletado com sucesso! :)"));
        }        
    } catch (error) {
        res.send(JSON.stringify("Deu errado :("));
    }
})

module.exports = router;
