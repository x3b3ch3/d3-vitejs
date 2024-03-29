<template>
  <aside @mouseenter="open" @mouseleave="close">
    <h1>{{ titles.mode }}</h1>
    <ul class="types">
      <li :key="index" 
          v-bind:data-id="value.field"
          v-bind:class="{'active' : index === 0 }"
          v-for="(value, index) in types" @click="typesLiClick">{{ value.name }}</li>
    </ul>
    <h1>{{ titles.team }}</h1>
    <ul class="teams">
      <li :key="index" 
          v-bind:data-id="value[0]"
          v-bind:class="{'active' : value[0] === '42' || value[1].pos === 1 }"
          v-for="(value, index) in sortedTeams" @click="teamsLiClick">{{ value[1].pos }}. {{ value[1].name }} ({{ value[1].abbreviation }}) - {{ Math.round(100*value[1].pts)/100 }}</li>
    </ul>
  </aside>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import * as d3 from 'd3'
import teams from '/datas/teams.min.json'
</script>

<script>
export default {
  mounted() {
    this.selis = [...document.querySelectorAll('.teams li.active')]
    this.emitIds()
    this.emitType()
    setTimeout(this.close, 2000)
  },
  computed: {
    sortedTeams: () => Object.entries(teams).filter(d => d[1].pos).sort((a,b) => a[1].pos - b[1].pos)
  },
  methods: {
    typesLiClick(event) {
      event.target.parentNode.querySelectorAll('li').forEach(e => e.classList.remove('active'))
      event.target.classList.toggle('active')
      this.emitType()
    },
    emitType() {
      this.$emit('changed-type', document.querySelector('.types li.active').dataset.id)
    },
    teamsLiClick(event) {
      event.target.classList.toggle('active')
      // si el courant est actif, ajouter au tableau
      if (event.target.classList.contains('active')) 
        this.selis.push(event.target)
      // sinon, retirer au tableau
      else
        this.selis.splice(this.selis.indexOf(event.target),1)

      // si 10 éléménts, retirer et éteindre le premier du tableau
      if (this.selis.length > 10)
        this.selis.shift().classList.remove('active')

      this.emitIds()
    },
    emitIds(event) {
      this.$emit('changed-team-ids', [...document.querySelectorAll('.teams li')].map(li => {
        const id = li.dataset.id
        const active = li.classList.contains('active')
        return Object.assign({id},teams[id],{active})
      }))
    },
    toggle(flag) {
      this.$el.classList.toggle('closed',flag)
    },
    open() {
      this.toggle(false)
    },
    close() {
      this.toggle(true)
    }
  },
  data() {
    return {
      types: [{
                name:'Points',
                field:'pts'
              },{
                name:'Rang mondial',
                field:'pos'
              },
      ],
      titles:{
        mode:'Sélectionner un mode d\'affichage',
        team:'Sélectionner une équipe (10 max)'
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  aside 
    top               : 0
    height            : 100vh
    padding           : 10px 0
    position          : fixed
    right             : 0
    background-color  : rgba(255,255,255,.9)
    border-left       : 1px solid grey
    transition        : right 1s
    box-shadow        : -1px 0 10px rgba(0,0,0,.2)
  
    &.closed 
      right           : -310px
  
  h1 
    text-transform    : uppercase
    color             : darkgrey
    font-size         : 12pt
    border-bottom     : 1px solid darkgrey
    text-align        : left
    padding-left      : 20px
  
  ul
    list-style        : none
    &.teams 
      height          : calc(100% - 160px)
      overflow        : auto
  
    &.types
      text-align      : left
  
      > li 
        display       : inline-block
      
        &:last-of-type 
          margin-left : 10px
  
    li 
      text-align      : left
      color           : grey
      cursor          : pointer
    
      &.active 
        color         : blue
  
  button.chevron 
    position          : absolute
    top               : 10px
    left              : 10px
    height            : 10px
    width             : 10px
  
</style>

