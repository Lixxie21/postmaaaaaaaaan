import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";
const app = express();
connectDB();

app.use(express.json());

// quedan repetidos si los dejo
app.get("/getAllCards", async (req, res) => {
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
});

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + "" + email);
    res.status(200).send("Data received succesfuly");
});

app.get("/hello", (req, res) => {
    res.status(200).send("Idk I'm so tired, Finn");
});

// tarea
//createCard
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

// update
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

// update2.0
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

// delete
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

/*
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
});*/





//VETE ALV TODO ESO PA UNA MMDA AAAAAAAAAHH
app.get("/endpoints", (req, res) => {
  const baseUrl = "https://postmaaaaaaaaan.onrender.com";

  const template = [
    {
      path: `${baseUrl}/createCard`,
      method: "POST",
      description: "Crea una nueva tarjeta en la base de datos"
    },
    {
      path: `${baseUrl}/updateCard/:id`,
      method: "PUT",
      description: "Actualiza completamente una tarjeta por su ID"
    },
    {
      path: `${baseUrl}/updateCardPartial/:id`,
      method: "PATCH",
      description: "Actualiza parcialmente una tarjeta por su ID"
    },
    {
      path: `${baseUrl}/deleteCard/:id`,
      method: "DELETE",
      description: "Elimina una tarjeta por su ID"
    },
    {
      path: `${baseUrl}/getcard/:id`,
      method: "GET",
      description: "Obtiene una tarjeta específica por su ID"
    },
    {
      path: `${baseUrl}/getallcards`,
      method: "GET",
      description: "Obtiene todas las tarjetas registradas"
    },
    {
      path: `${baseUrl}/send`,
      method: "POST",
      description: "Recibe datos enviados por el usuario (nombre, correo, etc.)"
    },
    {
      path: `${baseUrl}/hello`,
      method: "GET",
      description: "Devuelve un mensaje de prueba"
    },
    {
      path: `${baseUrl}/getAllCards`,
      method: "GET",
      description: "Endpoint de prueba existente (crea tarjeta al recibir cuerpo)"
    },
    {
      path: `${baseUrl}/getCard/:id`,
      method: "GET",
      description: "Endpoint original para obtener una tarjeta por ID"
    }
  ];

  res.status(200).json({
    mensaje: "Listado de endpoints disponibles en la API",
    total: template.length,
    rutas: template
  });
});


app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});