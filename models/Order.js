const { Schema, models, model } = require("mongoose");

const OrderSchema = new Schema({
    name: String,
});

const Order = models?.Order || model('Order',OrderSchema);

export default Order;