<template>
	<aside>
	  <ul >
		  <li :key="key" 
		  		v-bind:data-id="key"
		  		v-bind:class="{'active' : index < top }"
		  		v-for="(value, key, index) in teams" @click="liClick">{{ value.name }} ({{ value.abbreviation }})</li>
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
		this.emitIds()
	},
	methods: {
		liClick(event) {
			event.target.classList.toggle('active')
			this.emitIds()
		},
		emitIds() {
			this.$emit('changed-team-ids', [...document.querySelectorAll('li.active')].map(e => {
				const id = e.dataset.id
				return Object.assign({id},teams[id])
			}))
		}
	},
	props: {
   top: String
 	}
}
</script>

<style scoped>
	h1 { color : red; }
	aside {
		top: 0;
		padding: 20px;
		height: calc(100vh - 40px);
		position: fixed;
		right: 0;
		background-color: rgba(255,255,255,.9);
	}
	ul {
		height: calc(100% - 40px);
		overflow: auto;
		list-style: none;
	}
	li {
		text-align: left;
		color: grey;
	}
	li.active {
		color: blue;
	}
</style>

