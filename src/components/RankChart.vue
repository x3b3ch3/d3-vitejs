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
      const topTeams = this.allteams.map((team, id) => {
        id = team.id
        const promise = d3.json(`../datas/teams/${id}.min.json`)
                          .then(datas => {
            if (!dates.length) dates = Object.keys(datas).map(d=>new Date(d))
            return Object.assign(team, {values:Object.values(datas)})
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
        .range([margin.left, width - margin.right]);

      const svg = d3.create('svg')
        .attr('viewBox', [0, 0, width, height])
        .style('overflow', 'visible');


      const legend = svg.append('g')
        .attr('transform', `translate(${width/2+margin.left/2},${height+margin.top+margin.bottom})`);

      [ [wrcs,'blue',-370,'World cups'],
        [automn,'orange',110,`Coupe d'automne des nations`],
        [sixNations,'red',-540,'6 Nations cups'],
        [rcs,'green',-210,'Tri Nations / Rugby Championships'],
      ].forEach(([serie,color,xpos,title]) => {
        serie.forEach(e => {
          const start = new Date(e.start.split('-').toString())
          const end = new Date(e.end.split('-').toString())
          svg.append('rect')
          .attr('transform', `translate(${this.x(start)},${margin.top})`)
          .attr('width', this.x(end)-this.x(start))
          .attr('height', height-margin.top-margin.bottom)
          .attr('fill',color)
          .attr('fill-opacity',.07)
        })

        legend.append('rect')
          .attr('width', 40)
          .attr('height', 20)
          .attr('fill',color)
          .attr('fill-opacity',.07)
          .attr('stroke','darkgrey')
          .attr('x',xpos)
          .attr('y',-15)
        legend.append('text')
          .attr('x',xpos+50)
          .text(title)
      })

      const filteredSeries = this.data.series.filter(s => s)
      const min = d3.min(filteredSeries, d => d3.min(d.values.map(v => v[this.type])))
      const max = d3.max(filteredSeries, d => d3.max(d.values.map(v => v[this.type])))
      let yDomain = [min, max]
      if (this.type === 'pos') yDomain = yDomain.reverse();
      this.y = d3.scaleLinear()
        .domain(yDomain).nice()
        .range([height - margin.bottom, margin.top]);

      const xAxis = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(this.x).ticks(width / 80).tickSizeOuter(0));
      const xAxisGrid = g => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .attr('stroke-opacity', .2)
        .call(d3.axisBottom(this.x).ticks(height / 40).tickFormat('').tickSizeInner(-height+margin.top+margin.bottom));

      const yAxis = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(this.y));
      const yAxisGrid = g => g
        .attr('transform', `translate(${margin.left},0)`)
        .attr('stroke-opacity', .2)
        .call(d3.axisLeft(this.y).ticks(height / 40).tickFormat('').tickSizeInner(-width+margin.right+margin.left));

      svg.append('g')
         .call(xAxis);
      svg.append('g')
         .call(xAxisGrid);

      const yAxisEl = svg.append('g')
         .call(yAxis);

      const yAxisGridEl = svg.append('g')
         .call(yAxisGrid);

      const line = d3.line()
        .defined(d => !isNaN(d))
        .x((d, i) => this.x(this.data.dates[i]))
        .y(d => this.y(d));

      const path = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke-width', 1.5)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round');

      const popin = svg.append('g')
        .attr('class', 'popin')
        .attr('display', 'none');

      popin.append('circle')
        .attr('r', 2.5);

      const front = popin.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 14)
        .attr('text-anchor', 'middle')

      const back = front.append('rect')
        .attr('fill', '#FFF')
        .attr('stroke', '#000')
        .attr('stroke-opacity', .3)
        .attr('fill-opacity', .7)

      front.append('text')
        .attr('class', 'date')
        .attr('y', -60);

      front.append('text')
        .attr('class', 'name')
        .attr('y', -40);

      front.append('text')
        .attr('class', 'score')
        .attr('y', -20);

      const update = () => {
          const min = d3.min(filteredSeries, d => d3.min(d.values.map(v => v[this.type])))
          const max = d3.max(filteredSeries, d => d3.max(d.values.map(v => v[this.type])))
          yDomain = [min, max]
          if (this.type === 'pos') yDomain = yDomain.reverse() 
          this.y = d3.scaleLinear()
            .domain(yDomain).nice()
            .range([height - margin.bottom, margin.top])

          yAxisEl
            .transition().duration(1000)
            .call(yAxis)
          yAxisGridEl
            .transition().duration(1000)
            .call(yAxisGrid)

          path.selectAll('path')
              .data(this.data.series)
              .join(
                enter => {
                  return enter.append('path')
                  .attr('stroke', d => colors[(d || {}).abbreviation] || 'steelblue')
                  .attr('d', d => line(((d || {}).values || []).map(v => v[this.type])))
                  .attr('stroke-dasharray', (d,id,pathes) => pathes[id].getTotalLength() + ' ' + pathes[id].getTotalLength())
                  .attr('stroke-dashoffset', (d,id,pathes) => pathes[id].getTotalLength())
                  .call(enter => enter.transition().duration(1000)
                      .attr('stroke-dashoffset', 0)
                  )
                },
                update =>  update
                  .call(update => update
                    .attr('stroke-dasharray', (d,id,pathes) => pathes[id].getTotalLength() + ' ' + pathes[id].getTotalLength())
                    .attr('stroke-dashoffset', 0)
                    .transition().duration(1000)
                    .attr('d', d => line(((d || {}).values || []).map(v => v[this.type])))
                    .on('end', () => {
                      svg.call(this.hover, path.selectAll('path'))
                    })
                ),
                exit => exit
                  .transition().duration(1000)
                  .attr('stroke-dashoffset', (d,id,pathes) => pathes[id].getTotalLength())
                  .on('end', () => exit.remove())
              )
              .attr('stroke', d => colors[(d || {}).abbreviation] || 'steelblue')
              .style('mix-blend-mode', 'multiply')
        }
      update();
      svg.call(this.hover, path.selectAll('path'))

      return {
        node : svg.node(),
        update
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

      const x = this.x;
      const y = this.y;
      const data = this.data;
      const prop = this.type;
      const frontMargin = 20;
      const popin = svg.select('g.popin');
      const front = popin.select('g');
      const back = front.select('rect');

      function moved(event) {
        event.preventDefault();
        const pointer = d3.pointer(event, this);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);
        const i = d3.bisectCenter(data.dates, xm);
        const s = d3.least(data.series.filter(s => s), d => Math.abs(d.values.map(v => v[prop])[i] - ym));
        path.style('stroke', d => d === s ? colors[d.abbreviation]  : '#bbb').filter(d => d === s).raise();
        popin.attr('transform', `translate(${x(data.dates[i])},${y(s.values.map(v => v[prop])[i])})`);
        front.select('text.date').text(DateTime.fromJSDate(data.dates[i]).toLocaleString(DateTime.FULL_DATE));
        front.select('text.name').text(s.name);
        front.select('text.score').text(s.values.map(v => `pos:${v.pos}; pts:${v.pts.toPrecision(4)}`)[i].toString())
        back.attr('width', () => 2*frontMargin+d3.max([...front.selectAll('text')].map(t=>t.getBBox().width)))
        back.attr('height', () => 1.5*frontMargin+d3.sum([...front.selectAll('text')].map(t=>t.getBBox().height)))
        back.attr('x', () => -(2*frontMargin+d3.max([...front.selectAll('text')].map(t=>t.getBBox().width)))/2)
        back.attr('y', () => -(2*frontMargin+d3.sum([...front.selectAll('text')].map(t=>t.getBBox().height))))
      }

      function entered() {
        path
          .style('mix-blend-mode', null)
          .style('stroke', '#bbb');
        popin.attr('display', null)
      }

      function left() {
        path
          .style('mix-blend-mode', 'multiply')
          .style('stroke', null);
        popin.attr('display', 'none')
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
<style lang="sass">
  p.chart
    margin : 0 100px
    height : calc(100vh - 100px)

  .tick text
    font-size : 16px
</style>