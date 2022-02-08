# Day 3 tasks

We were asked to create database "orders"

---

## Retrieve all documents in a collection ?

```bash
db.orders.find()
```

---

## Retrieve all documents that contain paid orders (the "paid" field is "Y") ?

```bash
db.orders.find({"paid": "Y"})
```

---

## Retrieve all documents that contain paid orders and the orders are from before 2019 ?

```bash
db.orders.find({"paid": "Y", "year": {$lt: 2019}})
```

---

## Retrieve all documents that contain unpaid orders or whose orders are from before 2019 ?

```bash
db.orders.find({$or:[{"paid": "N"}, {"year": {$lt: 2019}}]})
```

---

## Retrieve all documents that contain orders whose price is in NOK ?

```bash
db.orders.find({"cost.currency": "NOK"})
```

---

## Retrieve all documents that contain orders whose price is less than 18 NOK ?

```bash
db.orders.find({$or:[{"cost.currency": "NOK"}, {"cost.price": {$lt: 18}}]})
```

---

## Retrieve all documents with orders that contain product "p2" ?

```bash
db.orders.find({"items.product": "p2"})
```

---

## Retrieve all documents with orders that contain products whose quantity is less than 13 ?

```bash
db.order.find({"items.quantity": {$lt: 13}})
```

---

## Retrieve all documents with orders that contain products whose quantity is less than 13 and contain no products whose quantity exceeds 13 ?

```bash
db.orders.find({"items": {$not: {$all: [{$elemMatch: {"quantity": {$gte: 13}}}]}}})
```

---

## Retrieve all documents with orders that contain products whose first colour (i.e., first element in the "colours" array) is blue ?

```bash
db.orders.find({"items.colours.0": "blue"})
```
