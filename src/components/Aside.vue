<template>
	<aside>
		<button class="chevron" @click="toggle">&lt;</button>
		Select props
		<ul class="types">
		  <li :key="index" 
		  		v-bind:data-id="value.field"
		  		v-bind:class="{'active' : !index }"
		  		v-for="(value, index) in types" @click="typesLiClick">{{ value.name }}</li>
		</ul>
		Select teams
	  <ul class="teams">
		  <li :key="key" 
		  		v-bind:data-id="key"
		  		v-bind:class="{'active' : index < top }"
		  		v-for="(value, key, index) in teams" @click="teamsLiClick">{{ value.name }} ({{ value.abbreviation }})</li>
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
		this.emitType()
	},
	methods: {
		typesLiClick(event) {
			event.target.parentNode.querySelectorAll('li').forEach(e => e.classList.remove('active'))
			event.target.classList.toggle('active')
			this.emitType()
		},
		teamsLiClick(event) {
			event.target.classList.toggle('active')
			this.emitIds()
		},
		emitIds() {
			this.$emit('changed-team-ids', [...document.querySelectorAll('.teams li.active')].map(e => {
				const id = e.dataset.id
				return Object.assign({id},teams[id])
			}))
		},
		emitType() {
			this.$emit('changed-type', document.querySelector('.types li.active').dataset.id)
		},
		toggle(event) {
			event.target.parentNode.classList.toggle('closed')
		}
	},
	props: {
   top: String
 	},
 	data() {
 		return {
 			types: [{
 				name:'Position',
 				field: 'pos'
 			},{
 				name:'Points',
 				field: 'pts'
 			}]
 		}
 	}
}
</script>

<style scoped>
	aside {
		top: 0;
		height: 100vh;
		padding: 10px 0;
		position: fixed;
		right: 0;
		background-color: rgba(255,255,255,.9);
		border-left: 1px solid grey;
		transition: right 1s;
	}
	aside.closed {
		right: -250px
	}
	ul.teams {
		height: calc(100% - 160px);
		overflow: auto;
	}
	ul.types {
		text-align: left;
	}
	ul.types > li {
		display: inline-block;
	}
	ul.types > li:last-of-type {
		margin-left: 10px;
	}
	ul {
		list-style: none;
	}
	li {
		text-align: left;
		color: grey;
	}
	li.active {
		color: blue;
	}
	button.chevron {
		position : absolute;
		top : 10px;
		left: 10px;
		height: 10px;
		width: 10px;
	}
</style>

