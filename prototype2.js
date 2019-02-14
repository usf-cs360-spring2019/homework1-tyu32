var outputObj = {
  category:[],
  sum:[],
}
//Loading Data from local csv.fiel
var LoadingData = function(){
convertRow = function(row, index){
  let out = {};
  for (let col in row){
    switch (col) {
      case "Category":
       out[col] = row[col];
       outputObj.category.push(row[col]);
       break;
      case "Sum":
      out[col] = parseInt(row[col]);
      outputObj.sum.push(row[col]);
      break;
      default:
          console.log(col);
    }
  }
  return out;
}
 d3.csv("TableauOutPut\\top 5.csv", convertRow)
 .then(() => {
   DrawBarChart();
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
    // let incidentScale = d3.scaleLinear()
    //     .domain([countMin, countMax])
    //     .range([plotHeight, 0])
    //     .nice();
    //
    // //Scalling number of days of a month as xAxis
    // let monthScale = d3.scaleBand()
    //     .domain(outputObj.dates.reverse()) // all letters (not using the count here)
    //     .rangeRound([0, plotWidth])
    //     .paddingInner(0.1); // space between bars

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
var pieData = pie(outputObj.sum);
var pieData1 = pie(outputObj.category);
var arcData = d3.pie().sort(null).value(function(d){
  return d;
})(outputObj.sum);

var g = svg.append("g")
      .attr("transform","translate("+margin.top+","+margin.left+")");

var gs = g.selectAll(".g")
          //.data(pieData)
          .data(arcData)
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
    //.text(outputObj.sum)
    // .text(function(d){
    //   return (d.data);
    // })
    .text(function(d,i){
      return outputObj.sum[i] + "\n"+ outputObj.category[i];
    })
    .attr('font-size', 14)


};


// var text = svg.select(".labels").selectAll("text")
//                .data(pieData);
//
//            // text.enter()
//            //     .append("text")
//            //     .attr("dy", ".35em")
//            //     .text(function (d) {
//            //         return d.data.label;
//            //     });
//
//            function midAngle(d) {
//                return d.startAngle + (d.endAngle - d.startAngle) / 2;
//            }
//
//            text.transition().duration(1000)
//                .attrTween("transform", function (d) {
//                    this._current = this._current || d;
//                    var interpolate = d3.interpolate(this._current, d);
//                    this._current = interpolate(0);
//                    return function (t) {
//                        var d2 = interpolate(t);
//                        //获取文本内容在外圆的中心位置坐标
//                        var pos = outerArc.centroid(d2);
//                        //然后将文本内容进行左右平移，移动到固定的radius长度，方向由饼图中心角度是否大于180度决定。
//                        pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
//                        return "translate(" + pos + ")";
//                    };
//                })
//                .styleTween("text-anchor", function (d) {
//                    this._current = this._current || d;
//                    var interpolate = d3.interpolate(this._current, d);
//                    this._current = interpolate(0);
//                    return function (t) {
//                        var d2 = interpolate(t);
//                        //判断文本的锚点位置
//                        return midAngle(d2) < Math.PI ? "start" : "end";
//                    };
//                });
//
//            text.exit()
//                .remove();
//              };

LoadingData();
// DrawBarChart();
