import Dessert from "../models/Dessert.js";

export const getDessert = async (req, res) => {
    try {
        const { id } = req.params;
        //Validar que la pelicula exista
        if (!Dessert.findById(id)) return res.status(404).json({ message: "Dessert not found" });
        // Buscar la pelicula en la base de datos en mongo
        const dessert = await Dessert.findOne({ _id: id });
        res.json(dessert);
    } catch (error) {
        console.log(error);
    }

}

export const getDesserts = async (req, res) => {
    try {
        const dessert = await Dessert.find();
        res.json(dessert);
    } catch (error) {
        console.log(error);
    }
}

export const createDessert = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        const newDessert = new Dessert({
            name,
            description,
            price,
            image,
            category
        });

        //Guardar la pelicula en la base de datos
        const saveDessert= await newDessert.save();
        //Responder al cliente
        res.status(201).json(saveDessert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateDessertById = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, image, category } = req.body;
        //Validar que la pelicula exista
        if (!Dessert.findById(id)) return res.status(404).json({ message: "Dessert not found" });

        const updatedDessert = new Dessert({
            _id: id,
            name,
            description,
            price,
            image,
            category
        });
        res.status(200).json(updatedDessert);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteDessertById = async (req, res) => {
    try {
        const { id } = req.params;
        //Validar que la pelicula exista
        if (!Dessert.findById(id)) return res.status(404).json({ message: "Dessert not found" });

        await Dessert.findByIdAndDelete(id);
        res.status(200).json({ message: "Dessert deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}