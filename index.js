import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app= express();
connectDB();

app.use(express.json());

app.get("/getAllCards", async (req, res) => {
    try{
        const card = await Card.create(req.body);
        console.log(card);
        res.status(200).json(card).send("card created succesfully");
    }
    catch(error){
        console.error(error);
    }
});

app.get("/getCard/:id", async (req, res) => {
    try{
        const id = parseInt(req.params.id);
        const cards = await Card.findById(req.params.id);
        res.status(200).json(cards);
    } catch(error){
        res.status(400).send(error);
        console.error(error);
    }
});

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + "" + email);
    res.status(200).send("Data received succesfuly");
});

app.get("/hello", (req, res) => {
    res
    .status(200)
    .send("Idk I'm so tired, Finn");
});

app.listen(3000, () => {
    console.log("Servidor ejecutandose en http://localhost:3000");
});