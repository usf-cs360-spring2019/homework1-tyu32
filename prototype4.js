var outputObj = {
  dates:[],
  sum:[],
}
//Loading Data from local csv.fiel
var LoadingData2 = function(){
convertRow = function(row, index){
  let out = {};
  for (col in row){
    switch (col) {
      case "Day":
      //console.log("Days: "+ row[col]);
      // out[col] = row[col];
       outputObj.dates.push(row[col]);
      // console.log(row[col]);
       break;
      case "Sum":
      let x = parseInt(row[col]);
      outputObj.sum.push(x);
    //  console.log("sss"+outputObj.incidentId);
    //  console.log(row[col]);
      break;
      default:
          console.log(col);

    }
  }
  return out;
}
//console.log(dates);
 d3.csv("output\\number of day.csv", convertRow)
 .then(() => {
   DrawBarChart2();
 })
}
var DrawBarChart2 = function(){
  // console.log("csv obj is: " + csvObj);
  // let day = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
  let countMin = 0;
  //Maximum number of incidents
  let countMax = 464;
  //console.log("Count bounds: " +[countMin, countMax]);
  let svg = d3.select("body").select("section:nth-child(3)").select("div").select("svg");
  let margin = {
    top:    15,
    right:  35, // leave space for y-axis
    bottom: 50, // leave space for x-axis
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
        .domain(outputObj.dates) // all letters (not using the count here)
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
        plot.attr("transform", "translate(" + 30+ "," + margin.top + ")");
      }

    let xAxis = d3.axisBottom(monthScale);
    let yAxis = d3.axisLeft(incidentScale);

    if (plot.select("g#y-axis").size() < 1) {
    let xGroup = plot.append("g").attr("id", "x-axis");

    // the drawing is triggered by call()
    xGroup.call(xAxis);

    // notice it is at the top of our svg
    // we need to translate/shift it down to the bottom
    xGroup.attr("transform", "translate(0," + plotHeight + ")")

    // do the same for our y axix
    let yGroup = plot.append("g").attr("id", "y-axis");
    yGroup.call(yAxis);
    //yGroup.attr("transform", "translate(" + plotWidth + ",0)");
  }
  else {
    // we need to do this so our chart updates
    // as we type new letters in our box
    plot.select("g#y-axis").call(yAxis);
}
// incidents = [391,343,417,396,415,376,449,410,410,369,353,402,383,410,390,306,408,430
//   ,447,453,395,420,429,374,259,387,416,432,408,380,393];
  var color = d3.scaleLinear()
  .domain([259, 453])
  .range(["#FFAAB3", "#ae1c25"]);
// console.log("incidents: "+ incidents);
// console.log("out: "+  " - "  + outputObj.incidents);


  let bars = plot.selectAll("rect")
              .data(outputObj.sum)
              .enter().append("rect")
              .attr("width", monthScale.bandwidth()-20)
              .attr("x", function(d, i) {
                return 10+ monthScale(outputObj.dates[i]);
              })
              .attr("y", function(d, i){
                console.log(outputObj.sum);
                return incidentScale(outputObj.sum[i]);
              })
              .attr("height", function(d, i){
                return (plotHeight - incidentScale(outputObj.sum[i]));
              })
              .attr("fill", function(d, i){
                return color(outputObj.sum[i]);
              });

              for (var i = 0; i < 31; i++) {
                console.log(outputObj.sum[i]);
                svg.append("text")
                          .text(outputObj.sum[i])
                          .style('fill', 'black')
                          .style('writing-mode','tb')
                          .attr("x", 50+monthScale(outputObj.dates[i]))
                          .attr("y", incidentScale(outputObj.sum[i])-20)
                        }

                        svg.append("text")
                      .attr("x", (plotWidth / 2))
                      .attr("y", 0 - (plotHeight / 2) + 186)
                      .attr("text-anchor", "middle")
                      .style("font-size", "16px")
                      .style("text-decoration", "underline")
                      .text("Total Number of Incidents in Everyday");

                      svg.append("text")
                    .attr("x", (plotWidth / 2))
                    .attr("y", 0 - (plotHeight / 2) + 560)
                    .attr("text-anchor", "middle")
                    .style("font-size", "16px")
                    .text("Audience will find most of days have around 400 incidents");
};

LoadingData2();
