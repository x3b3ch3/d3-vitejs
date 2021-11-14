<template>
  <img alt="Vue logo" src="./assets/mruLogo.svg"/>
  <Aside top="10" @changed-team-ids="updateIds" @changed-type="updateType" />
  <RankChart v-bind:teams="teams" v-bind:type="type" />
</template>

<script setup>
import RankChart from './components/RankChart.vue'
import Aside from './components/Aside.vue'
</script>

<script>
	export default {
		methods: {
			updateIds(ids) {
				this.teams = ids
			},
			updateType(type) {
				this.type = type
			}
		},
		data() {
      return {
        teams: [],
        type: 'pos'
      }
    },
	}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
[data-flag-pos-x]:before {
	content: '';
	background: url(./assets/tLogo20x-sprite@x2.png) no-repeat;
  background-size: 280px 276px;
  background-position-x: attr(data-flag-pos-x);
  background-position-y: attr(data-flag-pos-y px);
  width: 20px;
	height: 25px;
	display: inline-block;
	margin-right: 5px;
	vertical-align: middle;
}
</style>