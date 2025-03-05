const dscc = require('@google/dscc');
const d3 = require('d3');

// Define the visualization
function drawViz(data) {
  const width = 500;
  const height = 400;

  // Select the container
  const container = d3.select('#viz')
    .html('')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

  const dataset = data.tables.DEFAULT.map(d => ({
    name: d.dimID,
    value: +d.metricID
  }));

  const x = d3.scaleBand()
    .domain(dataset.map(d => d.name))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(dataset, d => d.value)])
    .range([height, 0]);

  // Add bars with rounded corners
  container.selectAll('rect')
    .data(dataset)
    .enter()
    .append('rect')
    .attr('x', d => x(d.name))
    .attr('y', d => y(d.value))
    .attr('width', x.bandwidth())
    .attr('height', d => height - y(d.value))
    .attr('fill', 'steelblue')
    .attr('rx', 10)  // **This adds rounded corners**
    .attr('ry', 10); // **This controls vertical rounding**
}

// Listen for data updates
dscc.subscribeToData(drawViz, { transform: dscc.objectTransform });
