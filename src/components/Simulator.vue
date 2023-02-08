<template>
  <aside @mouseenter="open" @mouseleave="close">
    <h1>Simulateur</h1>
    <div class="team-form">
      <label>Domicile</label>
      <select class="home-team" v-model="selectedHome" @change="changeTeam">
        <option v-for="(value, key, index) in sortedTeams" v-bind:value="value[0]" >{{ value[1].name }}</option>
      </select>
      <input class="home-score" type="number" value="0" pattern="[0-9]+" name="" @change="changeScore">
    </div>
    <div class="team-form">
      <label>Visiteurs</label>
      <select class="guest-team" v-model="selectedGuest" @change="changeTeam">
        <option v-for="(value, key, index) in sortedTeams" v-bind:value="value[0]" >{{ value[1].name }}</option>
      </select>
      <input class="guest-score" type="number" value="0" pattern="[0-9]+" name="" @change="changeScore">
    </div>
    <button @click="compute">Résultat (console) ></button>
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
      if (this.$el === event.explicitOriginalTarget) return
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
      const coeff = Math.abs(diffScore) > 15 ? 1.5 : 1
      this.match.home.newPts = this.match.home.pts - (diffPts / 10 - Math.sign(diffScore)) * coeff
      this.match.guest.newPts = this.match.guest.pts + (diffPts / 10 - Math.sign(diffScore)) * coeff
      console.log(this.match)
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
    top              : 0
    width            : 300px
    height           : 100vh
    padding          : 10px 0
    position         : fixed
    left             : 0
    background-color : rgba(255,255,255,.9)
    border-right     : 1px solid grey
    transition       : left 1s
    box-shadow       : -1px 0 10px rgba(0,0,0,.2)
  
    &.closed 
      left           : -240px
  
  h1 
    text-transform   : uppercase
    color            : darkgrey
    font-size        : 12pt
    border-bottom    : 1px solid darkgrey
    text-align       : left
    padding-left     : 20px

  .team-form
    margin           : 10px 0
    > *
      margin         : 0 3px
    label
      font-size      : 11pt
    select
      width          : 140px

    input[type='number']
      width          : 50px

  button
    cursor           : pointer
  
</style>