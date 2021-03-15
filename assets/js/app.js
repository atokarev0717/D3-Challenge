// @TODO: YOUR CODE HERE!

//Read CSV File
d3.csv("./assets/data/data.csv")
    .then(function(risk_data){

//convert date to propper format
risk_data.forEach(function(data) {
    data.age = +data.age;
    data.smokes = +data.smokes;
    data.healthcare = +data.healthcare;
    data.poverty = +data.poverty;
    data.abbr = data.abbr;
    data.income = +data.income;

console.log(data.age);
console.log(data.smokes);
console.log(data.healthcare);
console.log(data.poverty);
console.log(data.abbr);
console.log(data.income);

});
    });
