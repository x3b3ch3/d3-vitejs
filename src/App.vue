<template>
  <img alt="Vue logo" src="./assets/mruLogo.svg"/>
  <Aside top="10" @changed-team-ids="this.updateIds" @changed-type="this.updateType" />
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
</style>