import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app = express();
connectDB();

app.use(express.json());

// Lo que ya había

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + "" + email);
    res.status(200).send("Data received succesfuly");
});

app.get("/hello", (req, res) => {
    res.status(200).send("Idk I'm so tired, Finn");
});

// Tarea

// createCard
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

// updatecard
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

// updatecard2.0
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

// deletecard
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

// getcard
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

// getallcards
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


app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});