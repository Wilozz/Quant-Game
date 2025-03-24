import random
from assets import assets

class TradableAssets: 
    def __init__(self, assetId, name, initialPrice):
       self.assetId = assetId
       self.name = name
       self.price = initialPrice
       self.history = [initialPrice] # To track the price movements 

    def updatePrice(self, newPrice):
        self.price = newPrice
        self.history.append(newPrice)
    
    def getPrice(self):
        return self.price