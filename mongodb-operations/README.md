# MongoDB-Aggregation-and-Logical-Operation-Notes

## MongoDB Dataset Example with Aggregation & Logical Operations

This README demonstrates how to:

- Create a simple dataset in MongoDB  
- View the dataset  
- Apply **aggregation functions** (`$avg`, `$sum`, `$max`)  
- Perform **logical operations** (`$and`, `$or`, `$ne`)  
- Visualize results  

---

## Create Database & Dataset

Run the following commands in the **MongoDB shell**:

```js
use iceCreamParlorDB

db.flavors.insertMany([
  { flavor: "Chocolate Fudge", price: 180, stock_level: 80, shop_location: "T. Nagar" },
  { flavor: "Strawberry Bliss", price: 160, stock_level: 120, shop_location: "Adyar" },
  { flavor: "Vanilla Bean", price: 150, stock_level: 200, shop_location: "T. Nagar" },
  { flavor: "Pistachio Delight", price: 220, stock_level: 60, shop_location: "Besant Nagar" },
  { flavor: "Mango Tango", price: 190, stock_level: 90, shop_location: "Adyar" },
  { flavor: "Coffee Kick", price: 200, stock_level: 75, shop_location: "T. Nagar" }
])
```

<img width="853" height="199" alt="image" src="https://github.com/user-attachments/assets/f8448aa7-dae0-4dbf-a6a8-3c228b40024b" />


```js
db.flavors.find().pretty()
```
<img width="488" height="878" alt="image" src="https://github.com/user-attachments/assets/e02fed6c-b1f8-43ce-8736-4abb0564f789" />


## Aggregate Operations
```js
db.flavors.aggregate([
  { $group: { _id: null, averagePrice: { $avg: "$price" } } }
])
```
<img width="488" height="46" alt="image" src="https://github.com/user-attachments/assets/c194facd-dce2-4e9a-ba06-9e1251801278" />

Count the number of different flavors available in each shop location:

```js
db.flavors.aggregate([
  { $group: { _id: "$shop_location", flavorCount: { $sum: 1 } } }
])
```
<img width="678" height="157" alt="image" src="https://github.com/user-attachments/assets/3d993fa5-9f1c-4dc6-a0e3-4391d832c73e" />

Find the highest price of an ice cream flavor in each shop location:

```js
db.flavors.aggregate([
  { $group: { _id: "$shop_location", highestPrice: { $max: "$price" } } }
])
```

<img width="710" height="159" alt="image" src="https://github.com/user-attachments/assets/060ed4ea-3c75-4d04-9a46-25532c92456f" />

