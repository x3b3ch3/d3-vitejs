<template>
  <h1>top <input id="top" type="number" v-model="top"></h1>
  <p class="chart">
  </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import * as d3 from 'd3'
import teams from '/datas/teams.min.json'
import colors from '/datas/colors.json'
import wrcs from '/datas/wrcs.json'
import sixNations from '/datas/6nations.json'
import { DateTime } from 'luxon'

</script>

<script>
export default {
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      const promises = [];
      let dates = [];
      const topTeams = Object.keys(teams).slice(0,+this.top).map(uid => {
        const promise = d3.json(`./datas/teams/${uid}.min.json`)
                          .then(datas => {
          if (!dates.length) dates = Object.keys(datas).map(d=>new Date(d))
          Object.assign(topTeams.find(({id}) => id == uid), {values:Object.values(datas)})
        })
        promises.push(promise)
        return Object.assign({id:uid},teams[uid])
      })
      Promise.all(promises).then(datas =>  {
        this.data = {series: topTeams,dates}
        if (!this.chartEl) {
          this.chartEl = this.chart()
          d3.select('body .chart').node().appendChild(this.chartEl.node)
        } else {
          this.chartEl.update()
        }
      });
    },
    chart() {
      const width = screen.availWidth
      const height = screen.availHeight - 300
      const margin = ({top: 20, right: 200, bottom: 20, left: 200})

      this.x = d3.scaleUtc()
        .domain(d3.extent(this.data.dates))
        .range([margin.left, width - margin.right])

      const svg = d3.create('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('overflow', 'visible');

      wrcs.forEach(e => {
        const start = new Date(e.start.split('-').toString())
        const end = new Date(e.end.split('-').toString())
        svg.append('rect')
        .attr('transform', `translate(${this.x(start)},${margin.top})`)
        .attr('width', this.x(end)-this.x(start))
        .attr('height', height-margin.top-margin.bottom)
        .attr('fill',0)
        .attr('fill-opacity',.1)
      })

      sixNations.forEach(e => {
        const start = new Date(e.start.split('-').toString())
        const end = new Date(e.end.split('-').toString())
        svg.append('rect')
        .attr('transform', `translate(${this.x(start)},${margin.top})`)
        .attr('width', this.x(end)-this.x(start))
        .attr('height', height-margin.top-margin.bottom)
        .attr('fill',0)
        .attr('fill-opacity',.05)
      })

      this.prop = 'pts'
      let yDomain = [d3.min(this.data.series, d => d3.min(d.values.map(v => v[this.prop]))), d3.max(this.data.series, d => d3.max(d.values.map(v => v[this.prop])))]
      if (this.prop === 'pos') yDomain = yDomain.reverse() 
      this.y = d3.scaleLinear()
        .domain(yDomain).nice()
        .range([height - margin.bottom, margin.top])

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(this.x).ticks(width / 80).tickSizeOuter(0))
      const xAxisGrid = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .attr('stroke-opacity', .2)
        .call(d3.axisBottom(this.x).ticks(height / 40).tickFormat('').tickSizeInner(-height+margin.top+margin.bottom))

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(this.y))
      const yAxisGrid = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .attr('stroke-opacity', .2)
        .call(d3.axisLeft(this.y).ticks(height / 40).tickFormat('').tickSizeInner(-width+margin.right+margin.left))

      svg.append('g')
         .call(xAxis)
      svg.append('g')
         .call(xAxisGrid)

      const yAxisEl = svg.append('g')
         .call(yAxis)

      const yAxisGridEl = svg.append('g')
         .call(yAxisGrid)

      const line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => this.x(this.data.dates[i]))
        .y(d => this.y(d))

      const path = svg.append('g')
          .attr('fill', 'none')
          .attr('stroke-width', 1.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
      const pathes = path.selectAll('path')
        .data(this.data.series)
              .join(
                enter => {
                  return enter.append('path')
                    .attr('stroke', d => colors[d.abbreviation] || 'steelblue')
                    .style('mix-blend-mode', 'multiply')
                    .attr('d', d => line(d.values.map(v => v[this.prop])))
                },
                update => {
                  return update.attr('d', d => line(d.values.map(v => v[this.prop])))
                },
                function(exit) {
                  return exit.remove()
                }
              )

      svg.call(this.hover, pathes)

      return {
        node : svg.node(),
        update : () => {
          yDomain = [d3.min(this.data.series, d => d3.min(d.values.map(v => v[this.prop]))), d3.max(this.data.series, d => d3.max(d.values.map(v => v[this.prop])))]
          this.y = d3.scaleLinear()
            .domain(yDomain).nice()
            .range([height - margin.bottom, margin.top])

          yAxisEl.call(yAxis)
          yAxisGridEl.call(yAxisGrid)

          path.selectAll('path')
              .data(this.data.series)
              .join(
                enter => {
                  return enter.append('path').attr('stroke', d => colors[d.abbreviation] || 'steelblue')
                    .style('mix-blend-mode', 'multiply')
                    .attr('d', d => line(d.values.map(v => v[this.prop])))
                },
                update => {
                  return update.attr('d', d => line(d.values.map(v => v[this.prop])))
                },
                function(exit) {
                  return exit.remove()
                }
              )

          svg.call(this.hover, path.selectAll('path'))
        }
      }
    },
    hover(svg, path) {
      if ('ontouchstart' in document) svg
        .style('-webkit-tap-highlight-color', 'transparent')
        .on('touchmove', moved)
        .on('touchstart', entered)
        .on('touchend', left)
      else svg
        .on('mousemove', moved)
        .on('mouseenter', entered)
        .on('mouseleave', left);

      const dot = svg.append('g')
        .attr('display', 'none');

      dot.append('circle')
        .attr('r', 2.5);

      const legend = dot.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')

      legend.append('rect')
        .attr('fill', '#FFF')
        .attr('stroke', '#000')
        .attr('stroke-opacity', .3)
        .attr('fill-opacity', .7)

      legend.append('text')
        .attr('class', 'date')
        .attr('y', -38);

      legend.append('text')
        .attr('class', 'name')
        .attr('y', -24);

      legend.append('text')
        .attr('class', 'score')
        .attr('y', -10);

      const x = this.x;
      const y = this.y;
      const data = this.data;
      const prop = this.prop;
      const legendMargin = 7;

      function moved(event) {
        event.preventDefault();
        const pointer = d3.pointer(event, this);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);
        const i = d3.bisectCenter(data.dates, xm);
        const s = d3.least(data.series, d => Math.abs(d.values.map(v => v[prop])[i] - ym));
        path.style('stroke', d => d === s ? null : '#ddd').filter(d => d === s).raise();
        dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values.map(v => v[prop])[i])})`);
        legend.select('text.date').text(DateTime.fromJSDate(data.dates[i]).toLocaleString(DateTime.FULL_DATE));
        legend.select('text.name').text(s.name);
        legend.select('text.score').text(s.values.map(v => `pos:${v.pos}; pts:${v.pts}`)[i].toString())
        legend.select('rect').attr('width', () => 2*legendMargin+d3.max([...legend.selectAll('text')].map(t=>t.getBBox().width)))
        legend.select('rect').attr('height', () => 2*legendMargin+d3.sum([...legend.selectAll('text')].map(t=>t.getBBox().height)))
        legend.select('rect').attr('y', () => d3.min([...legend.selectAll('text')].map(t=>t.getBBox().y))-legendMargin)
        legend.select('rect').attr('x', () => d3.min([...legend.selectAll('text')].map(t=>t.getBBox().x))-legendMargin)
      }

      function entered() {
        path
          .style('mix-blend-mode', null)
          .style('stroke', '#ddd');
        dot.attr('display', null)
      }

      function left() {
        path
          .style('mix-blend-mode', 'multiply')
          .style('stroke', null);
        dot.attr('display', 'none')
      }
    }
  },
  data() {
    return { top: 10, data:{} }
  },
  watch: {
    top: function(val, oldVal) {
      this.fetch()
    }
  }
} 

</script>

<style>
</style>