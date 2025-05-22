import React, { useState, useEffect } from "react";

function MainPage() {
  const [orderBook, setOrderBook] = useState({ bids: {}, asks: {} });
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [orderType, setOrderType] = useState("buy");

  const aggregateOrders = (orders) => {
    const result = {};
    for (let price = 1; price <= 100; price++) {
      const orderList = orders[price] || []; 
      result[price] = orderList.reduce((sum, [, quantity]) => sum + quantity, 0);
    }
    return result; 
  }

  const aggregatedBids = aggregateOrders(orderBook.bids);
  const aggregatedAsks = aggregateOrders(orderBook.asks);

  // Function to fetch the order book from flask
  const fetchOrderBook = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/orderbook");
      const data = await response.json();
      setOrderBook(data);  // Update the state with the latest order book
    } catch (error) {
      console.error("Error fetching order book:", error);
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
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
        <button onClick={placeOrder} style={{ marginLeft: "10px" }}>
          Place {orderType.toUpperCase()} Order
        </button>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "40px" }}>
        <div style = {{ display: "flex", alignItems: "center", flexDirection: "column"}}>
          <h3>Bids</h3>
          <div style={{ maxHeight: "600px", width: "400px", overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
            {Array.from({ length: 100 }, (_, i) => {
              const price = 100 - i;  
              const bidQty = aggregatedBids[price] || 0;

              const maxBarWidth = 200; // px

              return (
                <div key={price} style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>
                  {/* Bids Bar */}
                  <div style={{
                    width: `${(bidQty / 100) * maxBarWidth}px`,
                    backgroundColor: "green",
                    height: "20px",
                    marginLeft: "5px"
                  }} />

                  <div style={{ width: "60px", textAlign: "center" }}>Price: {price}</div>

                </div>
              );
            })}
          </div>   
        </div>
        
        <div style = {{ display: "flex", alignItems: "center", flexDirection: "column"}}>
          <h3>Asks</h3>
          <div style={{ maxHeight: "600px", width: "400px", overflowY: "scroll", border: "1px solid gray", padding: "10px" }}>
            {Array.from({ length: 100 }, (_, i) => {
              const price = 100 - i; 
              const askQty = aggregatedAsks[price] || 0;

              const maxBarWidth = 200; // px

              return (
                <div key={price} style={{ display: "flex", alignItems: "center", marginBottom: "2px" }}>

                  <div style={{ width: "60px", textAlign: "center" }}>Price: {price}</div>

                  {/* Asks Bar */}
                  <div style={{
                    width: `${(askQty / 100) * maxBarWidth}px`,
                    backgroundColor: "red",
                    height: "20px",
                    marginLeft: "5px"
                  }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>



    </div>
  );
}

export default MainPage;
