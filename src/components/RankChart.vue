<template>
  <p class="chart"></p>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import * as d3 from 'd3'
import colors from '/datas/colors.json'
import wrcs from '/datas/wrcs.json'
import rcs from '/datas/rcs.json'
import automn from '/datas/automn.json'
import sixNations from '/datas/6nations.json'
import { DateTime } from 'luxon'
</script>

<script>
export default {
  methods: {
    fetch() {
      const promises = [];
      let dates = [];
      const topTeams = this.allteams.map(team => {
        const uid = team.id
        const promise = d3.json(`../datas/teams/${uid}.min.json`)
                          .then(datas => {
          if (!dates.length) dates = Object.keys(datas).map(d=>new Date(d))
          Object.assign(topTeams.find(({id}) => id == uid), {values:Object.values(datas)})
        })
        promises.push(promise)
        return team
      })
      Promise.all(promises).then(datas =>  {
        this.data = {series: topTeams, dates}
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
      const height = screen.availHeight
      const margin = ({top: 20, right: 20, bottom: 20, left: 20})

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
        .attr('fill','blue')
        .attr('fill-opacity',.07)
      })

      automn.forEach(e => {
        const start = new Date(e.start.split('-').toString())
        const end = new Date(e.end.split('-').toString())
        svg.append('rect')
        .attr('transform', `translate(${this.x(start)},${margin.top})`)
        .attr('width', this.x(end)-this.x(start))
        .attr('height', height-margin.top-margin.bottom)
        .attr('fill','orange')
        .attr('fill-opacity',.07)
      })

      sixNations.forEach(e => {
        const start = new Date(e.start.split('-').toString())
        const end = new Date(e.end.split('-').toString())
        svg.append('rect')
        .attr('transform', `translate(${this.x(start)},${margin.top})`)
        .attr('width', this.x(end)-this.x(start))
        .attr('height', height-margin.top-margin.bottom)
        .attr('fill','red')
        .attr('fill-opacity',.07)
      })

      rcs.forEach(e => {
        const start = new Date(e.start.split('-').toString())
        const end = new Date(e.end.split('-').toString())
        svg.append('rect')
        .attr('transform', `translate(${this.x(start)},${margin.top})`)
        .attr('width', this.x(end)-this.x(start))
        .attr('height', height-margin.top-margin.bottom)
        .attr('fill','green')
        .attr('fill-opacity',.07)
      })

      const legend = svg.append('g')
        .attr('transform', `translate(${width/2+margin.left/2},${height+margin.top+margin.bottom})`)

      legend.append('rect')
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill','red')
        .attr('fill-opacity',.07)
        .attr('stroke','darkgrey')
        .attr('x',-240)
        .attr('y',-15)
      legend.append('text')
        .attr('x',-190)
        .text('6 Nations cups')

      legend.append('rect')
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill','blue')
        .attr('fill-opacity',.07)
        .attr('stroke','darkgrey')
        .attr('x',-70)
        .attr('y',-15)
      legend.append('text')
        .attr('x',-20)
        .text('World cups')

      legend.append('rect')
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill','green')
        .attr('fill-opacity',.07)
        .attr('stroke','darkgrey')
        .attr('x',100)
        .attr('y',-15)
      legend.append('text')
        .attr('x',150)
        .text('Tri Nations / Rugby Championships')

      legend.append('rect')
        .attr('width', 40)
        .attr('height', 20)
        .attr('fill','orange')
        .attr('fill-opacity',.07)
        .attr('stroke','darkgrey')
        .attr('x',100)
        .attr('y',-15)
      legend.append('text')
        .attr('x',150)
        .text(`Coupe d'automne des nations`)

      let yDomain = [d3.min(this.data.series, d => d3.min(d.values.map(v => v[this.type]))), d3.max(this.data.series, d => d3.max(d.values.map(v => v[this.type])))]
      if (this.type === 'pos') yDomain = yDomain.reverse() 
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
          .join('path')
            .attr('stroke', d => colors[d.abbreviation] || 'steelblue')
            .style('mix-blend-mode', 'multiply')
            .attr('d', d => line(d.values.map(v => v[this.type])))
              // .join(
              //   enter => {
              //     enter.append('path').attr('stroke', d => colors[d.abbreviation] || 'steelblue')
              //       .style('mix-blend-mode', 'multiply')
              //       .attr('d', d => line(d.values.map(v => v[this.type])))
              //   },
              //   update =>  update
              //     .attr('stroke', d => colors[d.abbreviation] || 'steelblue')
              //     .style('mix-blend-mode', 'multiply')
              //     .attr('d', d => line(d.values.map(v => v[this.type]))),
              //   exit => exit.remove()
              // )
              

      svg.call(this.hover, pathes)

      return {
        node : svg.node(),
        update : () => {
          yDomain = [d3.min(this.data.series, d => d3.min(d.values.map(v => v[this.type]))), d3.max(this.data.series, d => d3.max(d.values.map(v => v[this.type])))]
          if (this.type === 'pos') yDomain = yDomain.reverse() 
          this.y = d3.scaleLinear()
            .domain(yDomain).nice()
            .range([height - margin.bottom, margin.top])

          yAxisEl.transition().call(yAxis)
          yAxisGridEl.transition().call(yAxisGrid)

          path.selectAll('path')
              .data(this.data.series)
              .join(
                enter => {
                  const tpath = enter.append('path')
                  // return tpath.transition().on('end', () => {
                    tpath.attr('stroke', d => colors[d.abbreviation] || 'steelblue')
                      .style('mix-blend-mode', 'multiply')
                      .attr('d', d => line(d.values.map(v => v[this.type])))
                  // })
                },
                update =>  update.transition()
                  .attr('stroke', d => colors[d.abbreviation] || 'steelblue')
                  .style('mix-blend-mode', 'multiply')
                  .attr('d', d => line(d.values.map(v => v[this.type])))
                  .on('end', () => {
                    svg.call(this.hover, path.selectAll('path'))
                  }),
                exit => exit.remove()
              )

          
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
        .attr('font-size', 14)
        .attr('text-anchor', 'middle')

      const back = legend.append('rect')
        .attr('fill', '#FFF')
        .attr('stroke', '#000')
        .attr('stroke-opacity', .3)
        .attr('fill-opacity', .7)

      legend.append('text')
        .attr('class', 'date')
        .attr('y', -60);

      legend.append('text')
        .attr('class', 'name')
        .attr('y', -40);

      legend.append('text')
        .attr('class', 'score')
        .attr('y', -20);

      const x = this.x;
      const y = this.y;
      const data = this.data;
      const prop = this.type;
      const legendMargin = 20;

      function moved(event) {
        event.preventDefault();
        const pointer = d3.pointer(event, this);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);
        const i = d3.bisectCenter(data.dates, xm);
        const s = d3.least(data.series, d => Math.abs(d.values.map(v => v[prop])[i] - ym));
        path.style('stroke', d => d === s ? null : '#bbb').filter(d => d === s).raise();
        dot.attr('transform', `translate(${x(data.dates[i])},${y(s.values.map(v => v[prop])[i])})`);
        legend.select('text.date').text(DateTime.fromJSDate(data.dates[i]).toLocaleString(DateTime.FULL_DATE));
        legend.select('text.name').text(s.name);
        legend.select('text.score').text(s.values.map(v => `pos:${v.pos}; pts:${v.pts}`)[i].toString())
        back.attr('width', () => 2*legendMargin+d3.max([...legend.selectAll('text')].map(t=>t.getBBox().width)))
        back.attr('height', () => 1.5*legendMargin+d3.sum([...legend.selectAll('text')].map(t=>t.getBBox().height)))
        // back.attr('y', () => d3.min([...legend.selectAll('text')].map(t=>t.getBBox().y))-legendMargin*.5)
        // back.attr('x', () => d3.min([...legend.selectAll('text')].map(t=>t.getBBox().x))-legendMargin)
        back.attr('x', () => (-2*legendMargin+d3.max([...legend.selectAll('text')].map(t=>t.getBBox().width)))/2)
        back.attr('y', () => (-1.5*legendMargin+d3.sum([...legend.selectAll('text')].map(t=>t.getBBox().height)))/2)
      }

      function entered() {
        path
          .style('mix-blend-mode', null)
          .style('stroke', '#bbb');
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
    return { data:{}  }
  },
  watch: {
    teams(val, oldVal) {
      this.allteams = val
      this.fetch()
    },
    type(val, oldVal) {
      this.fetch()
    }
  },
  props: ['teams','type']
} 

</script>
<style>
  p.chart {
    margin: 0 200px;
    height: calc(100vh - 200px);
  }
  .tick text {
    font-size: 16px;
  }
</style>