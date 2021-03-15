// @TODO: YOUR CODE HERE!

//Read CSV File
function chart() {

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
    
    let svg_width = 950;
    let svg_height = 600;
    
    let margin = {
    top: 30,
    right: 30,
    bottom: 100,
    left:80
    };

// set margins
    let width = svg_width - margin.left - margin.right;
    let height = svg_height - margin.top - margin.bottom;


// add svg tag to html
let svg = d3.select("#scatter")
.append("svg")
.attr("width", svg_width)
.attr("height", svg_height);

let scatter_chart = svg.append("g")
.attr("transform", `translate(${margin.left}, ${margin.top})`);

//Scales for the graph
let xLinearScale = d3.scaleLinear()
.domain([8.5, d3.max(risk_data, d => d.poverty)])
.range([0, width]);

let yLinearScale = d3.scaleLinear()
.domain([3.5, d3.max(risk_data, d => d.healthcare)])
.range([height, 0]);

//Create axis (x and y)
    let xAxis = d3.axisBottom(xLinearScale);
    let yAxis = d3.axisLeft(yLinearScale);

//Append x and y axis
scatter_chart.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

scatter_chart.append("g")
    .call(yAxis);

//add circles to the graph
    scatter_chart.selectAll("circle")
        .data(risk_data)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.poverty))
        .attr("cy", d => yLinearScale(d.healthcare))
        .attr("r", 18)
        .attr("fill", "#6666FF")
        .attr("opacity", ".6")
        .attr("stroke-width", "2")
        .attr("stroke", "blue");

        scatter_chart.select("g")
        .selectAll("circle")
        .data(risk_data)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("x", d => xLinearScale(d.poverty))
        .attr("y", d => yLinearScale(d.healthcare))
        .attr("dy",-537)
        .attr("text-anchor", "middle")
        .attr("font-size", "14px")
        .attr("fill", "black");

   //axis labels
   scatter_chart.append("text")
   .attr("transform", "rotate(-90)")
   .attr("y", 0 - 45 )
   .attr("x", 0 -350)
   .attr("dy", "1em")
   .attr("class", "axisText")
   .text("<b>Lacks Healthcare (%)</b>");

   scatter_chart.append("text")
   .attr("transform", `translate(${width/2}, ${height + margin.top -50 })`)
   .attr("class", "axisText")
   .text("In Poverty (%)"); 

});

};

chart();