<template>
  <img alt="Vue logo" src="./assets/mruLogo.svg"/>
  <Aside top="10" @changed-team-ids="this.fetch" />
  <RankChart v-bind:teams="teams" />
</template>

<script setup>
import RankChart from './components/RankChart.vue'
import Aside from './components/Aside.vue'
</script>

<script>
	export default {
		methods: {
			fetch(ids) {
				this.teams = ids
			}
		},
		data() {
      return {
        teams: [],
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