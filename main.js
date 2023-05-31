const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose");

dotenv.config();

const app = express();
app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

const productRouts = require("./routes/productRouts");
app.use("/", productRouts);

// mongoose
const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;

async function connectMongodb() {
    await mongoose.connect(
        `mongodb+srv://${dbUser}:${dbPassword}@apinode.8lwbmra.mongodb.net/nodemongodb?retryWrites=true&w=majority`
    ).then(() => {
        const port = 8003;
        app.listen(port, function() { 
            console.log("Conexão realizada com sucesso! http://localhost:" + port); 
        })
    }).catch((error) => { console.log("Falha ao tentar de sonectar ao MongoDB: ", error); });
}
connectMongodb();
