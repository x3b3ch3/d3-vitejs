<template>
  <aside @mouseenter="open" @mouseleave="close">
    <h1>Simulateur</h1>
    <table class="form">
      <tr class="team-form">
        <td><label>Domicile</label></td>
        <td><select class="home-team" v-model="selectedHome" @change="changeTeam">
          <option v-for="(value, key, index) in sortedTeams" v-bind:value="value[0]" >{{ value[1].name }} ({{ value[1].abbreviation }})</option>
        </select></td>
        <td><input class="home-score" type="number" value="0" pattern="[0-9]+" name="" @change="changeScore"></td>
      </tr>
      <tr class="team-form">
        <td><label>Visiteurs</label></td>
        <td><select class="guest-team" v-model="selectedGuest" @change="changeTeam">
          <option v-for="(value, key, index) in sortedTeams" v-bind:value="value[0]" >{{ value[1].name }} ({{ value[1].abbreviation }})</option>
        </select></td>
        <td><input class="guest-score" type="number" value="0" pattern="[0-9]+" name="" @change="changeScore"></td>
      </tr>
      <tr>
        <td colspan="3"><button @click="compute">Résultats ></button> <button @click="clean">Remise à 0</button></td>
      </tr>
    </table>
    <table class="results"></table>
  </aside>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import * as d3 from 'd3'
import { DateTime } from 'luxon'
import teams from '/datas/teams.min.json'
</script>

<script>
export default {
  mounted() {
    this.match = {
      home  : {},
      guest : {}
    }
    this.$el.querySelectorAll('select').forEach(target => {
      this.changeTeam({target})
    })
    this.$el.querySelectorAll('input[type=number]').forEach(target => {
      this.changeScore({target})
    })
    setTimeout(this.close, 2000)
  },
  computed: {
    sortedTeams: function () {
      return Object.entries(teams).sort((a,b) => a[1].pos - b[1].pos); // Do your custom sorting here
    }
  },
  methods: {
    toggle(flag) {
      this.$el.classList.toggle('closed',flag)
    },
    open() {
      this.toggle(false)
    },
    close(event) {
      if (event && this.$el === event.explicitOriginalTarget) return
      this.$el.querySelectorAll('select').forEach((e,i,l) => {
        e.blur()
      })
      this.toggle(true)
    },
    changeTeam(event) {
      const target = event.target
      const uid = +target.value
      const targetTeam = target.classList.contains('home-team')
              ? 'home'
              : 'guest'
      this.match[targetTeam] = teams[event.target.value]
      this.match[targetTeam].score = +this.$el.querySelector(`.${targetTeam}-score`).value
      const promise = d3.json(`../datas/teams/${uid}.min.json`)
                        .then(datas => {
        this.match[targetTeam].pts = datas[Object.keys(datas).pop()].pts
      })
    },
    changeScore(event) {
      const target = event.target
      const targetTeam = target.classList.contains('home-score')
              ? 'home'
              : 'guest'
      this.match[targetTeam].score = +target.value
    },
    compute() {
      const diffPts = this.clamp(this.match.home.pts + 3 - this.match.guest.pts, -10, 10)
      const diffScore = this.match.home.score - this.match.guest.score
      let coeff = Math.abs(diffScore) > 15 ? 1.5 : 1
      const uTeams = Object.entries(this.teams).filter(d => d[1].pos)
      const teamTypes = ['home', 'guest']
      for (const teamType of teamTypes) {
        if (teamType === 'guest') coeff *= -1
        this.match[teamType].newPts = this.match[teamType].pts - (diffPts / 10 - Math.sign(diffScore)) * coeff
        const team = uTeams.find(d => d[1].abbreviation == this.match[teamType].abbreviation)
        team.newPts = this.match[teamType].newPts
      }
      uTeams.sort((a,b) => (a[1].newPts || a[1].pts) < (b[1].newPts || b[1].pts))
      for (const teamType of teamTypes) {
        const team = this.match[teamType]
        team.newPos = uTeams.findIndex(d => d[1].abbreviation == team.abbreviation) +1
      }

      this.$el.querySelector('.results').innerHTML = ''
      // search first and last index where pos has changed and isn't ex aequo
      const search = (d,i,l) => d[1].pos !== (i+1) && l.filter(e => e[1].pts === d[1].pts).length === 1
      const min = uTeams.findIndex(search)
      const max = uTeams.findLastIndex(search)
      for (let index = min; index <= max; index++) {
        const team = uTeams[index][1]
        let diffPts = ((team.newPts || team.pts) - team.pts).toPrecision(2)
        let diffPos = (team.pos - (index + 1))
        if (diffPos > 0) diffPos = '+' + diffPos
        if (diffPts > 0) diffPts = '+' + diffPts
        this.$el.querySelector('.results').innerHTML += `<tr><td>${team.abbreviation}</td><td>${(team.newPts || team.pts).toPrecision(4)}</td><td>(${diffPts})</td><td>${index + 1}</td><td>(${diffPos})</td></tr>`
      }

    },
    clean() {
      const uTeams = Object.entries(this.teams)
      this.$el.querySelector('.results').innerHTML = ''
      uTeams.filter(e => e[1].newPts).forEach(e => {
        delete e[1].newPts
        delete e[1].newPos
      })
    },
    clamp(value, min, max) {
      return Math.max(min, Math.min(value, max))
    }
  },
  data() {
    return {
      selectedHome  : '33',
      selectedGuest : '42'
    }
  }
}
</script>

<style lang="sass" scoped>
  aside 
    top               : 0
    width             : 300px
    height            : 100vh
    padding           : 10px 0
    position          : fixed
    left              : 0
    background-color  : rgba(255,255,255,.9)
    border-right      : 1px solid grey
    transition        : left 1s
    box-shadow        : -1px 0 10px rgba(0,0,0,.2)
  
    &.closed 
      left            : -240px
  
  h1 
    text-transform    : uppercase
    color             : darkgrey
    font-size         : 12pt
    border-bottom     : 1px solid darkgrey
    text-align        : left
    padding-left      : 20px

  .form
    width             : calc(100% - 40px)
    margin            : 10px 20px
    border-spacing    : 0
    border-collapse   : collapse
    .team-form
      line-height     : 30px
      label
        font-size     : 11pt
        color         : #2c3e50
      select
        width         : 120px
        color         : #2c3e50

      input[type='number']
        color         : #2c3e50
        width         : 50px
        border-radius : 5px

    button
      color           : #2c3e50
      cursor          : pointer
      width           : 90px
      margin          : 20px 10px

  .results
    width             : calc(100% - 40px)
    text-align        : center
    margin            : 0 20px
    border-spacing    : 0
    border-collapse   : collapse
    background        : rgba(0,0,0,.3)
    color             : white
    border-radius     : 5px
  
</style>
<style lang="sass">
  .results
    td
      padding          : 5px
      margin           : 0
      text-align       : left
      &:nth-of-type(2)
        text-align     : right
        width          : 50px
        background     : rgba(0,0,0,.1)
      &:nth-of-type(3)
        width          : 50px
        background     : rgba(0,0,0,.1)
      &:nth-of-type(4)
        text-align     : right
        width          : 20px
      &:nth-of-type(5)
        width          : 20px
</style>