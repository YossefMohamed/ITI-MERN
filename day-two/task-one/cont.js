let db = []

const add = (item) => db.push(item)
const total = () => db.length
const sum =()=> {
    let totalSum =0;
    for (let i=0 ; i<db.length;i++) {
        totalSum += db[i];
      }
    return totalSum
}
const show = () => db
module.exports = {
    add , total,sum ,show
}