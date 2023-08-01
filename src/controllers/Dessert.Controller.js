import Dessert from "../models/Dessert.js";

export const getDessert = async (req, res) => {
  try {
    const { id } = req.params;
    //Validar que el postre exista
    if (!Dessert.findById(id))
      return res.status(404).json({ message: "Dessert not found" });
    // Buscar el postre en la base de datos en mongo
    const dessert = await Dessert.findOne({ _id: id });
    res.json(dessert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getDesserts = async (req, res) => {
  try {
    const dessert = await Dessert.find();
    res.json(dessert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDessert = async (req, res) => {
  try {
    const { name, description, price, sweet, image, category, tags } = req.body;

    const newDessert = new Dessert({
      name,
      description,
      price,
      sweet,
      image,
      category,
      tags
    });

    //Guardar el postre en la base de datos
    const saveDessert = await newDessert.save();
    //Responder al cliente
    res.status(201).json(saveDessert);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDessertById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, sweet, image, category, tags, available } = req.body;
    const dessert = await Dessert.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        sweet,
        image,
        category,
        tags,
        available
      },
      { new: true }
    );

    if (!dessert) {
      return res.status(404).json({ error: "Postre no encontrado" });
    }
    res.json(dessert);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};

export const deleteDessertById = async (req, res) => {
  try {
    const { id } = req.params;
    //Validar que el postre exista
    if (!Dessert.findById(id))
      return res.status(404).json({ message: "Dessert not found" });

    await Dessert.findByIdAndDelete(id);
    res.status(200).json({ message: "Dessert deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
