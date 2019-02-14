var outputObj = {
  days:[],
  dates:[],
  ranks:[],
  incidents:[],
}
//Loading Data from local csv.fiel
var LoadingData = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Day":
       out[col] = row[col];
       outputObj.days.push(row[col]);
       break;
      case "Date":
      out[col] = parseInt(row[col]);
      outputObj.dates.push(row[col]);
      break;
      case "Rank":
      out[col] = parseInt(row[col]);
      outputObj.ranks.push(row[col]);
      break;
      case "Incidents":
      out[col] = +(row[col]);
      outputObj.incidents.push((out[col]));
      break;
    }
  }
  return out;
}
 d3.csv("TableauOutPut\\Part1-NumberOfIncidents.csv", convertRow)
 .then((csvObj) => {
   DrawBarChart(csvObj);
 })
}
var DrawBarChart = function(){
  // console.log("csv obj is: " + csvObj);
  // let day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  let countMin = 0;
  //Maximum number of incidents
  let countMax = 453;
  //console.log("Count bounds: " +[countMin, countMax]);
  let svg = d3.select("body").select("section:nth-child(2)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom;
    //Scalling the number of incidents as yAxis
    let incidentScale = d3.scaleLinear()
        .domain([countMin, countMax])
        .range([plotHeight, 0])
        .nice();

    //Scalling number of days of a month as xAxis
    let monthScale = d3.scaleBand()
        .domain(outputObj.dates.reverse()) // all letters (not using the count here)
        .rangeRound([0, plotWidth])
        .paddingInner(0.1); // space between bars

    let plot = svg.select("g#plot");

    if (plot.size() < 1) {
        // this is the first time we called this function
        // we need to steup the plot area
        plot = svg.append("g").attr("id", "plot");

        // notice in the "elements" view we now have a g element!

        // shift the plot area over by our margins to leave room
        // for the x- and y-axis
        plot.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      }

// try to create pie
var colorScale = d3.scaleOrdinal()
  .domain(d3.range(outputObj.length))
  .range(d3.schemeCategory10)


var pie = d3.pie();


var innerRadius = 0;
var outerRadius = 100;
var arc_generator = d3.arc()
        .innerRadius(0)
        .outerRadius(100);
var pieData = pie(outputObj.incidents);

console.log(pieData);

var g = svg.append("g")
      .attr("transform","translate("+margin.top+","+margin.left+")");

var gs = g.selectAll(".g")
          .data(pieData)
          .enter()
          .append("g")

          .attr("transform","translate("+plotWidth/2+","+plotHeight/2+")")


gs.append("path")
        .attr("d",function(d){
              return arc_generator(d);
        })
        .attr("fill",function(d,i){
          return colorScale(i);
        })

gs.append("text")
    .attr("transform",function(d){
      return "translate("+arc_generator.centroid(d)+")";
    })
    .attr("text-anchor","middle")

    .text(function(d){
      return d.data;
    })

};

LoadingData();
// DrawBarChart();
