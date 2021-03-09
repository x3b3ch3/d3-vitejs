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
		Select teams (10 max)
	  <ul class="teams">
		  <li :key="key" 
		  		v-bind:data-id="key"
		  		v-bind:class="{'active' : key === '42' || key === '37' }"
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
		this.lis = [...document.querySelectorAll('.teams li.active')]
		this.emitIds()
		this.emitType()
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
				this.lis.push(event.target)
			// sinon, retirer au tableau
			else
				this.lis.splice(this.lis.indexOf(event.target),1)

			// si 10 éléménts, retirer et éteindre le premier du tableau
			if (this.lis.length > 10)
				this.lis.shift().classList.remove('active')

			this.emitIds()
		},
		emitIds(event) {
			console.log(this.lis.map(e => e.dataset.id))
			this.$emit('changed-team-ids', this.lis.map(e => {
				const id = e.dataset.id
				return Object.assign({id},teams[id])
			}))
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

