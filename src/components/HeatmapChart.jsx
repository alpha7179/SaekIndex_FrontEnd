// src/components/HeatmapChart.jsx
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatmapChart = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {

    if (!data || data.length === 0) return;

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');

    svg.selectAll('*').remove();

    const allDates = [...new Set(data.map(d => d.date))];
    const xDomain = allDates;
    const x = d3.scaleBand()
      .range([margin.left, width - margin.right])
      .domain(xDomain)
      .padding(0.05);

    const allHours = [...new Set(data.map(d => d.hour))];
    const yDomain = allHours.sort((a, b) => a - b);
    const y = d3.scaleBand()
      .range([height - margin.bottom, margin.top])
      .domain(yDomain)
      .padding(0.05);

    const maxCount = d3.max(data, d => d.count) || 1;
    const colorScale = d3.scaleSequential([0, maxCount], d3.interpolate(d3.lab('white'), d3.lab('steelblue')));

    svg.selectAll('.heatmap-cell')
      .data(data, d => d.date + ':' + d.hour)
      .enter()
      .append('rect')
      .attr('class', 'heatmap-cell')
      .attr('x', d => x(d.date))
      .attr('y', d => y(d.hour))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .style('fill', d => colorScale(d.count));

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default HeatmapChart;