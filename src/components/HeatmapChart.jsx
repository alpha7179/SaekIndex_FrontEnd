// src/components/HeatmapChart.jsx
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const HeatmapChart = ({ data }) => {
  const svgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = Math.max(300, Math.min(500, width * 0.5));
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const { width, height } = dimensions;
    const margin = { 
      top: 20, 
      right: 20, 
      bottom: window.innerWidth < 768 ? 60 : 30, 
      left: window.innerWidth < 768 ? 30 : 40 
    };

    const svg = d3.select(svgRef.current)
      .attr('width', '100%')
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
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
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', window.innerWidth < 768 ? 'rotate(-45)' : 'rotate(0)')
      .style('font-size', window.innerWidth < 768 ? '10px' : '12px');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .selectAll('text')
      .style('font-size', window.innerWidth < 768 ? '10px' : '12px');

  }, [data, dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
      <svg ref={svgRef} style={{ display: 'block', width: '100%', height: 'auto' }}></svg>
    </div>
  );
};

export default HeatmapChart;