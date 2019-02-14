var outputObj3 = {
  category:[],
  sum:[],
}
//Loading Data from local csv.fiel
var LoadingData3 = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Category":
       out[col] = row[col];
       outputObj3.category.push(row[col]);
       break;
      case "Sum":
      out[col] = parseInt(row[col]);
      outputObj3.sum.push(row[col]);
      break;
      default:
          console.log(col);
    }
  }
  return out;
}
 d3.csv("output\\top 5.csv", convertRow)
 .then(() => {
   DrawBarChart3();
 })
}
var DrawBarChart3 = function(){
  // console.log("csv obj is: " + csvObj);
  let countMin = 0;
  //Maximum number of incidents
  let countMax = 453;
  //console.log("Count bounds: " +[countMin, countMax]);
  let svg = d3.select("body").select("section:nth-child(4)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 30, // leave space for x-axis
    left:   10
  };
    let bounds = svg.node().getBoundingClientRect();
    let plotWidth = bounds.width - margin.right - margin.left;
    let plotHeight = bounds.height - margin.top - margin.bottom
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
  .domain(d3.range(outputObj3.length))
  .range(d3.schemeCategory10)


var pie = d3.pie();


var innerRadius = 0;
var outerRadius = 100;
var arc_generator = d3.arc()
        .innerRadius(0)
        .outerRadius(100);
var pieData = pie(outputObj3.sum);
var pieData1 = pie(outputObj3.category);


var g = svg.append("g")
      .attr("transform","translate("+margin.top+","+margin.left+")");

var gs = g.selectAll(".g")
          .data(pieData)
          .enter()
          .append("g")
          .attr("transform","translate("+plotWidth/2+","+plotHeight/2+")")
var arc = d3.arc()
    .outerRadius(100)
    .innerRadius(0)

gs.append("path")
        .attr("d",function(d){
              return arc_generator(d);
        })
        .attr("fill",function(d,i){
          return colorScale(i);
        })

gs.append("text")
    .attr("transform",function(d){
      var x = arc_generator.centroid(d)[0] * 2.5 - 10;
      var y = arc_generator.centroid(d)[1] * 2.5;
      return "translate("+x+","+y+")";
    })
    .attr("text-anchor","middle")

    .text(function(d,i){
      return outputObj3.sum[i] + "\n"+ outputObj3.category[i];
    })
    .attr('font-size', 14)

    gs.append("text")
  .attr("x", (plotWidth / 2) - 650)
  .attr("y", 0 - (plotHeight / 2) + 30)
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("Top 5 Incidents Count Compare");

  gs.append("text")
.attr("x", (plotWidth / 2) - 850)
.attr("y", 0 - (plotHeight / 2) + 300)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.text("Incident Number and Incident Category.  Color shows details about Incident Category.  Size shows sum of Incident Number.  The");

gs.append("text")
.attr("x", (plotWidth / 2) - 845)
.attr("y", 0 - (plotHeight / 2) + 320)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.text("marks are labeled by Incident Number and Incident Category. The view is filtered on Incident Number, which keeps 676, 701, 727,");

gs.append("text")
.attr("x", (plotWidth / 2) - 930)
.attr("y", 0 - (plotHeight / 2) + 340)
.attr("text-anchor", "middle")
.style("font-size", "16px")
.text("948 and 4037.People can see larceny theft are over half even in top 5 total number of incidents. Roger Yu");


};

LoadingData3();
// DrawBarChart();
