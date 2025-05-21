import React, { useState, useEffect } from "react";

function MainPage() {
  const [orderBook, setOrderBook] = useState({ bids: {}, asks: {} });
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState("buy");

  // Function to fetch the order book from flask
  const fetchOrderBook = async () => {
    try {
      console.log("Trying to fetch order book")
      const response = await fetch("http://127.0.0.1:8000/orderbook");
      const data = await response.json();
      setOrderBook(data);  // Update the state with the latest order book
      console.log("ORder book data", data)
    } catch (error) {
      console.error("Error fetching order book:", error);
      console.log("Failed")
    }
  };

  // Function to place an order
  const placeOrder = async () => {
    if (!price || !quantity) {
      alert("Please enter both price and quantity.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: orderType,
          quantity: parseInt(quantity),
          price: parseFloat(price),
          orderId: Math.random().toString(36).substr(2, 9), // Generate a random order ID
        }),
      });

      const data = await response.json();
      alert(data.message); // Show the message from the backend
      
      // Update the order book with the data from the backend
      setOrderBook({
        bids: data.bids, // Updated bids
        asks: data.asks  // Updated asks
      });
      
      // Fetch the order book again after placing an order
      fetchOrderBook();
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  // Fetch order book when the component loads or after placing an order
  useEffect(() => {
    fetchOrderBook();
    
    // Optional: Refresh the order book every 3 seconds
    const intervalId = setInterval(fetchOrderBook, 3000);
    
    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);  // Empty array means it only runs once when the component mounts

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to the Trading Platform</h1>
      <p>Buy and sell assets in real-time!</p>

      {/* Trading Feature */}
      <div style={{ marginBottom: "20px" }}>
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={placeOrder} style={{ marginLeft: "10px" }}>
          Place {orderType.toUpperCase()} Order
        </button>
      </div>

      {/* Order Book Display */}
      <h2>Order Book</h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Bids Section */}
        <div style={{ marginRight: "50px" }}>
          <h3>Bids</h3>
          {Object.entries(orderBook.bids).length > 0 ? (
            <ul>
              {Object.entries(orderBook.bids).map(([price, orders]) => (
                <li key={price}>
                  <strong>${price}</strong>: {orders.length} orders
                  <ul>
                    {orders.map(([orderId, quantity]) => (
                      <li key={orderId}>
                        Order ID: {orderId}, Quantity: {quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No bids yet</p>
          )}
        </div>

        {/* Asks Section */}
        <div>
          <h3>Asks</h3>
          {Object.entries(orderBook.asks).length > 0 ? (
            <ul>
              {Object.entries(orderBook.asks).map(([price, orders]) => (
                <li key={price}>
                  <strong>${price}</strong>: {orders.length} orders
                  <ul>
                    {orders.map(([orderId, quantity]) => (
                      <li key={orderId}>
                        Order ID: {orderId}, Quantity: {quantity}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          ) : (
            <p>No asks yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;
