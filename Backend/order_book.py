from sortedcontainers import SortedDict
from collections import deque

class limitOrderBook: 
    # This has to be named __init__ as it initialises the "self"
    def __init__(self): 
        # Sorted Dics usually store in ascending order but we want to store bids in descending
        self.bids = SortedDict(lambda x: -x); 
        self.asks = SortedDict(); 
        
    # If user wants to create a limit order (buy, sell at a certain price), add to LOB
    def addOrder(self, action, quantity, price, orderId):
        book = self.bids if action == 'buy' else self.asks
        
        remainingTrades = self.orderMatching(action, quantity, price)
        if remainingTrades == 0:
            return
        
        if price not in book: 
            # book is a dictionary with the keys being the price and the elemnts being the deque
            book[price] = deque()
        
        # Stores it as a tuple which can be retrieved by 0 indexing
        book[price].append((orderId, remainingTrades))

    def orderMatching(self, action, quantity, price):
        book = self.bids if action == 'sell' else self.asks
        
        while quantity > 0:
            bestPrice = self.getBestBid() if action == 'sell' else self.getBestAsk()
             
            if bestPrice is None or (action == 'sell' and bestPrice < price) or (action == 'buy' and bestPrice > price):
                break

            # Get the values in the 0th index of the array stored under the key's price
            orderId, openQuantity = book[bestPrice][0]

            tradesMade = min(quantity, openQuantity)            
            quantity -= tradesMade
            openQuantity -= tradesMade
            
            if openQuantity == 0:
                book[bestPrice].popleft()
                if not book[bestPrice]:
                    del book[bestPrice] # If all trades of the other side fulfilled, remove price from LOB
            else:
                book[bestPrice][0] = (orderId, openQuantity)
        
        return quantity # Return amount of trades not matched

    # Remove the oldest order at a given price (LOB prioritise price and time)
    def removeOrder(self, action, price):
        book = self.bids if action == 'buy' else self.asks
        if price in book:
            book[price].popleft()
            if not book[price]:  # If no more orders at this price, delete price level
                del book[price]
    
    def getBestBid(self):
        if self.bids:
            bestPrice, _ = self.bids.peekitem(0)
            return bestPrice
        else:
            return None
        
    def getBestAsk(self):
        if self.asks:
            bestPrice, _ = self.asks.peekitem(0)
            return bestPrice
        else:
            return None
    
    def printOrderBook(self):
        """Prints the current state of the order book"""
        print("\nOrder Book:")
        print("Bids:", dict(self.bids))
        print("Asks:", dict(self.asks))