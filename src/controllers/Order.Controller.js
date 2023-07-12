import Order from "../models/Order.js";
import User from "../models/User.js";

// Crear un nuevo pedido
export const createOrder = async (req, res) => {
  try {
    const { userId, items, precioTotal } = req.body;

    // Verificar si el usuario existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Crear la lista de items
    const itemList = items.map(item => ({
      item: item.itemId,
      quantity: item.quantity
    }));

    // Crear la orden
    const order = new Order({
      user: userId,
      items: itemList,
      precioTotal,
      status: 'pending'
    });

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

// Obtener detalles de un pedido por ID
export const getOrderById = async (req, res) => {
 try{
  const { orderId } = req.params;
  const order = await Order.findById(orderId).populate('user').populate('items.item');
  if(!order){
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }
  res.json(order);
 }catch(error){
  res.status(500).json({ error: 'Error al obtener el pedido' });
 }
};

// Actualizar el estado de un pedido por ID
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el estado del pedido' });
  }
};
