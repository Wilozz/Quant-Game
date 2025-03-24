from market_simulation import TradableAssets
from assets import assets

asset1 = TradableAssets(assetId=1, name="Asset 1", initialPrice=100)
asset2 = TradableAssets(assetId=2, name="Asset 2", initialPrice=200)

# Simulate price movement
for _ in range(10):  # Simulate 10 price changes
    for asset in [asset1, asset2]:
        asset.randomPriceMovement()  # Update price using random walk
        print(f"{asset.name} (ID: {asset.assetId}) Price: {asset.getPrice()}")