import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app = express();
connectDB();

app.use(express.json());

// ---------- TUS ENDPOINTS ORIGINALES ----------
/*app.get("/getAllCards", async (req, res) => {
    try {
        const card = await Card.create(req.body);
        console.log(card);
        res.status(200).json(card).send("card created succesfully");
    } catch (error) {
        console.error(error);
    }
});

app.get("/getCard/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const cards = await Card.findById(req.params.id);
        res.status(200).json(cards);
    } catch (error) {
        res.status(400).send(error);
        console.error(error);
    }
});*/

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + "" + email);
    res.status(200).send("Data received succesfuly");
});

app.get("/hello", (req, res) => {
    res.status(200).send("Idk I'm so tired, Finn");
});

// ---------- NUEVOS ENDPOINTS AÑADIDOS EN ESPAÑOL ----------

// 1️⃣ CREAR TARJETA
app.post("/createCard", async (req, res) => {
    try {
        const nuevaCard = await Card.create(req.body);
        res.status(201).json({
            mensaje: "Tarjeta creada correctamente",
            datos: nuevaCard,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al crear la tarjeta", error });
    }
});

// 2️⃣ ACTUALIZAR TARJETA (TOTAL)
app.put("/updateCard/:id", async (req, res) => {
    try {
        const tarjetaActualizada = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarjetaActualizada)
            return res.status(404).json({ mensaje: "Tarjeta no encontrada" });

        res.status(200).json({
            mensaje: "Tarjeta actualizada correctamente (actualización total)",
            datos: tarjetaActualizada,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al actualizar la tarjeta", error });
    }
});

// 3️⃣ ACTUALIZAR TARJETA (PARCIAL)
app.patch("/updateCardPartial/:id", async (req, res) => {
    try {
        const tarjetaParcial = await Card.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tarjetaParcial)
            return res.status(404).json({ mensaje: "Tarjeta no encontrada" });

        res.status(200).json({
            mensaje: "Tarjeta actualizada parcialmente con éxito",
            datos: tarjetaParcial,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al actualizar parcialmente la tarjeta", error });
    }
});

// 4️⃣ ELIMINAR TARJETA
app.delete("/deleteCard/:id", async (req, res) => {
    try {
        const tarjetaEliminada = await Card.findByIdAndDelete(req.params.id);
        if (!tarjetaEliminada)
            return res.status(404).json({ mensaje: "Tarjeta no encontrada" });

        res.status(200).json({
            mensaje: "Tarjeta eliminada correctamente",
            datos: tarjetaEliminada,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al eliminar la tarjeta", error });
    }
});

// 5️⃣ OBTENER TARJETA POR ID
app.get("/getcard/:id", async (req, res) => {
    try {
        const tarjeta = await Card.findById(req.params.id);
        if (!tarjeta)
            return res.status(404).json({ mensaje: "Tarjeta no encontrada" });

        res.status(200).json({
            mensaje: "Tarjeta obtenida correctamente",
            datos: tarjeta,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al obtener la tarjeta", error });
    }
});

// 6️⃣ OBTENER TODAS LAS TARJETAS
app.get("/getallcards", async (req, res) => {
    try {
        const tarjetas = await Card.find();
        res.status(200).json({
            mensaje: "Todas las tarjetas obtenidas correctamente",
            datos: tarjetas,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ mensaje: "Error al obtener las tarjetas", error });
    }
});

// ---------- FIN NUEVOS ENDPOINTS ----------

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});