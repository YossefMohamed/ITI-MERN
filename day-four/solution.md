# Solution for Day 04 Task using mongosh and Mongo Client (Compass)

---

# UniversityDB

---

I created Database **UniversityDB**, then created 3 collections **student**, **faculty** and **course**, finally insert given documents using insertMany().

```bash
admin> use UniversityDB
     < 'switched to db UniversityDB'

UniversityDB> db.createCollection('student')
     < {ok: 1}

UniversityDB> db.createCollection('faculty')
     < {ok: 1}

UniversityDB> db.createCollection('course')
     < {ok: 1}

```

---

## Q1 : Create unique index on FacultyName on the Faculty collection ?

```bash
UniversityDB> db.faculty.createIndex({"FacultyName": 1}, {unique: true})
```

---

## Q2 : Using aggregation display the sum of final mark for all courses in Course collection ?

```bash
UniversityDB> db.course.aggregate([
    {$group: {_id: null, marksSum: {$sum: "$marks"}}}
])

```

> :warning: **At the above solution, I made schema at simple point of view like this, I know that This isn't logical, so i provided alt solution! :**


```javascript
{
    _id: MongoObj(uuid)
    CourseName: String
    marks: Array(int)
}

```

**The alt solution :**

```bash
UniversityDB> db.student.aggregate([
    {$group: {_id: null, marksSum: {$sum: "$marks"}}}
])

```

---

## Q3 : 

### P1: Implement relation between Student and Course, by adding array of Courses IDs in the student object ?

```bash
UniversityDB> db.student.insertOne({
    "StudentName": "Abdulla Nasser",
    "CoursesIds": [ObjectId("6203a6924a64abfaaaf0c726")],
    "facultyData": {
        "$ref": "faculty",
        "$id": ObjectId("6203a2404a64abfaaaf0c722")
    }
})

```

### P2: Select specific student with his name, and then display his courses ?

```bash
UniversityDB> var studentObj = db.student.findOne({"StudentName": "Abdulla Nasser"});

db.course.find({"_id": {$in : studentObj.CoursesIds}})

```

---

## Q4 : 

### P1: Implement relation between Student and faculty by adding the faculty object in the student using DBRef ?

```bash
UniversityDB> db.student.insertOne({
    "StudentName": "Abdulla Nasser",
    "CoursesIds": [ObjectId("6203a6974a64abfaaaf0c727")],
    "facultyData": {
        "$ref": "faculty",
        "$id": ObjectId("6203a2404a64abfaaaf0c722")
    }
})

```

### P2: Select specific student with his name, and then display his faculty ?

```bash
UniversityDB> var studentObj = db.student.findOne({"StudentName": "Abdulla Nasser"}, {"facultyData": 1});

var studentRef = studentObj.facultyData;

db[studentRef.$ref].findOne({"_id": studentRef.$id});

```

---

## Q5 : Display the count of students (use Group by with _id: null, to not specify grouping column) ?

```bash
UniversityDB> db.student.aggregate([
    {$group: {_id: null, studentsCount: {$sum: 1}}}
])

```

---


# TestDB

---

## Q6 : Retrieve the total number of delivery days, grouped by year; retrieve the results only after 2017 (Hint: use aggregation pipelines) ?

```bash
TestDB> db.order.aggregate([
    {$match: {"year": {$gt: 2017}}},
    {$group: {_id: "$year", TotalDeliveryDays: {$sum: "$delivery_days"}}}
])
```

---

## Q7 : Retrieve the total number of delivery days, grouped by year; retrieve the results only paid ?

```bash
TestDB> db.order.aggregate([
    {$match: {"paid": "Y"}},
    {$group: {_id: "$year", TotalDeliveryDays: {$sum: "$delivery_days"}}}
])
```

---

## Q8 : Retrieve the total number of price, grouped by currency ?

```bash
TestDB> db.order.aggregate([
    {$group: {_id: "$cost.currency", TotalPrice: {$sum: "$cost.price"}}}
])
```

---

## Q9 : Calc how many record have color black ?

```bash
TestDB> db.order.aggregate([
    {$match: {"items.colours": "black"}},
    {$group: {_id: null, BlackCount: {$sum: 1}}}
])
```

---

## Q10 : Retrieve total all price from year 2017 to 2018 ?

```bash
TestDB> db.order.aggregate([
    {$match: {"year": {$gte: 2017, $lte: 2018}}},
    {$group: {_id: null, TotalPrice: {$sum: "$cost.price"}}}
])
```

---

## Q11 : How many product paid from 2018 to 2020 ?

```bash
TestDB> db.order.aggregate([
    {$unwind: "$items"},
    {$match: {"year": {$gte: 2018, $lte: 2020}}},
    {$group: {_id: null, ProductsNum: {$sum: 1}}}
])
```

---

## Q12 : How many product currency nok and price greater than 20 ?

```bash
TestDB> db.order.aggregate([
    {$unwind: "$items"},
    {$match: {"cost.currency": "NOK", "cost.price": {$gt: 20}}},
    {$group: {_id: null, ProductsNum: {$sum: 1}}}
])
```

---

## Q13 : what is average delivery in 2020 ?

```bash
TestDB> db.order.aggregate([
    {$match: {"year": 2020}},
    {$group: {_id: null, AvgDeliveryDays: {$avg: "$delivery_days"}}}
]) 
      < { _id: null, AvgDeliveryDays: 4 }
```

---

## Q14 : what is average price when delivery less than 4 ?

```bash
TestDB> db.order.aggregate([
    {$match: {"delivery_days": {$lt: 4}}},
    {$group: {_id: null, AvgPrice: {$avg: "$cost.price"}}}
]) 
      < { _id: null, AvgPrice: 18 }
```

---

## Q15 : use mapReduce  clac the profit of total price of years  after subtract 7 and then multiply to 0.7 ?

```javascript
var map = function(){
    emit(this.year, this.cost.price);
    }

var reduce = function(year, price){
    var v = 0;
    for(var i = 0; i < price.length; i++){
        v += price[i] - 7;
    }
    return (v * 0.7)
}

db.order.mapReduce(map, reduce, {out:"TotalPrice"});
```