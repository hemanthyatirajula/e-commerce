import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://e-commerce-backend-ten-khaki.vercel.app/allorders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="orders">
      <h2>🧾 All Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Contact</th>
                <th>Address</th>
                <th>Items</th>
                <th>Total (₹)</th>
                <th>Shipping</th>
                <th>Discount</th>
                <th>Coupon</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Order Time</th>
                <th>Delivery Date</th>
                <th>Delivered?</th>
                <th>Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-6)}</td>
                  <td>{order.user?.name}</td>
                  <td>
                    📧 {order.user?.email}
                    <br />
                    📞 {order.user?.phone}
                  </td>
                  <td>
                    {order.address?.street}, {order.address?.city},<br />
                    {order.address?.state} - {order.address?.pincode}
                  </td>
                  <td>
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                      </div>
                    ))}
                  </td>
                  <td>₹{order.totalAmount}</td>
                  <td>₹{order.shippingCharge || 0}</td>
                  <td>₹{order.discountAmount || 0}</td>
                  <td>{order.couponCode || "—"}</td>
                  <td>{order.paymentMethod} <br />🆔 {order.paymentId}</td>
                  <td>{order.status}</td>
                  <td>{order.orderTime}</td>
                  <td>{order.deliveryDate}</td>
                  <td>{order.isDelivered ? "✅ Yes" : "❌ No"}</td>
                  <td>{order.deliveryTime || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
