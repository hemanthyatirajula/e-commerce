import React, { useEffect, useState } from "react";
import "./Orders.css";

const API_URL = "https://e-commerce-backend-ten-khaki.vercel.app";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const truncateId = (id) => {
    if (!id) return "—";
    return id.length > 12 ? `${id.slice(0, 12)}...` : id;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`${API_URL}/allorders`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="orders-page">
        <h2>All Orders</h2>
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <h2>All Orders</h2>

      <div className="table-container">
        {orders.length === 0 ? (
          <p className="orders-empty">No orders found.</p>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Phone</th>
                <th>Items Count</th>
                <th>Total Amount</th>
                <th>Payment Method</th>
                <th>Payment Status</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
                <th>Delivery Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => {
                const customerName = order.user?.name || "Unknown";
                const phone = order.user?.phone || "—";
                const itemsCount = Array.isArray(order.items) ? order.items.length : 0;
                const totalAmount = Number(order.totalAmount || 0);
                const paymentStatus = order.status || "Pending";
                const deliveryStatus = order.isDelivered ? "Delivered" : "Pending";

                return (
                  <tr key={order._id}>
                    <td className="order-id-cell">{truncateId(order._id)}</td>
                    <td>{customerName}</td>
                    <td>{phone}</td>
                    <td>{itemsCount}</td>
                    <td>₹{totalAmount.toLocaleString("en-IN")}</td>
                    <td>{order.paymentMethod || "—"}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          paymentStatus === "Success"
                            ? "success"
                            : paymentStatus === "Failed"
                            ? "failed"
                            : "pending"
                        }`}
                      >
                        {paymentStatus}
                      </span>
                    </td>
                    <td>{formatDate(order.orderTime)}</td>
                    <td>{formatDate(order.deliveryDate)}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          deliveryStatus === "Delivered"
                            ? "success"
                            : deliveryStatus === "Pending"
                            ? "pending"
                            : "failed"
                        }`}
                      >
                        {deliveryStatus}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;
