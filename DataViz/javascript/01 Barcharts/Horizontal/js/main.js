/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
*/



var margin = { left:100, right:20, top:50, bottom:100 };

var width = 600 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
    
var g = d3.select("#chart-area")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");

// Define colour pallet
var color = ["#3a6587", "#aeb3b7", "#aeb3b7"];

// Chart Title
g.append("text")
    .attr("y", height - 270)
    .attr("x", width / 2)
    .attr("font-size", "22px")
    .attr("text-anchor", "middle")
    .attr("fill", "#aeb3b7")  // This changes the Label text attr() or style()
    .text("Average Titanic Fare, by Class");


// X Label
g.append("text")
    .attr("y", height + 50)
    .attr("x", width / 2)
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("fill", "#aeb3b7")  // This changes the Label text attr() or style()
    .text("Class Type");

// Y Label
g.append("text")
    .attr("y", -80)
    .attr("x", -(height / 2))
    .attr("font-size", "20px")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("fill", "#aeb3b7")  // This changes the Label text attr() or style()
    .text("Average Fare Price (In Pounds)");

d3.json("data/log_msg_by_loc.json").then(function(data){
    // console.log(data);


    // Clean data
    data.forEach(function(d) {
        d.revenue = +d.revenue;
    });

    // X Scale
    var x = d3.scaleBand()
        .domain(data.map(function(d){ return d.month }))
        .range([0, width])
        .padding(0.2);

    // Y Scale
    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.revenue })])
        .range([height, 0]);

    // X Axis
    var xAxisCall = d3.axisBottom(x);
    g.append("g")
        .attr("class", "axisEx")
        .attr("transform", "translate(0," + height +")")
        .call(xAxisCall);

    // Y Axis
    var yAxisCall = d3.axisLeft(y)
        .tickFormat(function(d){ return "" + d; });
    g.append("g")
        .attr("class", "axisWhy")
        .call(yAxisCall);



    // Bars
    var rects = g.selectAll("rect")
        .data(data)
        
    rects.enter()
        .append("rect")
            .attr("y", function(d){ return y(d.revenue); })
            .attr("x", function(d){ return x(d.month) })
            .attr("height", function(d){ return height - y(d.revenue); })
            .attr("width", x.bandwidth)
            .attr("fill", function(d, i) {
                return color[i];
            })
            //.attr("fill", "#3a6587"); // This changes the column colour to a distinct colour
})
