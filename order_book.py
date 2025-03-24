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
        
        if price not in book: 
            # book is a dictionary with the keys being the price and the elemnts being the deque
            book[price] = deque()
        
        # Stores it as a tuple which can be retrieved by 0 indexing
        book[price].append((orderId, quantity))

    # Remove the oldest order at a given price (LOB prioritise price and time)
    def removeOrder(self, action, quantity, price, orderId):
        book = self.bids if action == 'buy' else self.asks
        if price in book:
            book[price].popleft()
            if not book[price]:  # If no more orders at this price, delete price level
                del book[price]
    
    def get_best_bid(self):
        if self.bids:
            return self.bids.peekitem(0)
        else:
            return None
        
    def get_best_ask(self):
        if self.asks:
            return self.asks.peekitem(0)
        else:
            return None
    
    def print_order_book(self):
        """Prints the current state of the order book"""
        print("\nOrder Book:")
        print("Bids:", dict(self.bids))
        print("Asks:", dict(self.asks))