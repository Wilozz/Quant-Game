from flask import Flask, request, jsonify
from flask_cors import CORS
from order_book import limitOrderBook 

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

order_book = limitOrderBook()

# Route to place a new order (Buy or Sell)
@app.route('/order', methods=['POST'])
def place_order():
    data = request.json
    action = data['action']
    quantity = data['quantity']
    price = data['price']
    order_id = data['orderId']

    # Add the order to the order book
    order_book.addOrder(action, quantity, price, order_id)

    # Return the updated order book
    return jsonify({
        'message': 'Order placed successfully',
        'bids': {price: list(queue) for price, queue in order_book.bids.items()},
        'asks': {price: list(queue) for price, queue in order_book.asks.items()}
    })

# Route to get current order book
@app.route("/orderbook", methods=["GET"])
def get_order_book():
    return jsonify({
        "bids": {price: list(queue) for price, queue in order_book.bids.items()},
        "asks": {price: list(queue) for price, queue in order_book.asks.items()}
    })

# Route to remove an order
@app.route("/remove_order", methods=["POST"])
def remove_order():
    data = request.json
    action = data.get("action")  # "buy" or "sell"
    price = float(data.get("price"))

    order_book.removeOrder(action, price)

    return jsonify({"message": f"Order at {price} removed!", "orderBook": get_order_book()})

if __name__ == "__main__":
    app.run(debug=True, port=8000)