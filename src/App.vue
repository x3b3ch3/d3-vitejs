<template>
  <!--img alt="Vue logo" src="./assets/mruLogo.svg"/-->
  <h2>{{ titre }}</h2>
  <Aside top="10" @changed-team-ids="updateIds" @changed-type="updateType" />
  <RankChart v-bind:teams="teams" v-bind:type="type" />
  <Simulator v-if="admin"/>
</template>

<script setup>
import RankChart from './components/RankChart.vue'
import Aside from './components/Aside.vue'
import Simulator from './components/Simulator.vue'
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
        teams : [],
        type  : 'pos',
        titre : 'Historique des classements / notes WRU',
        admin : true // window.localStorage.getItem('mru:admin')==='true'
      }
    },
  }
</script>

<style lang="sass">
  #app
    font-family             : Avenir, Helvetica, Arial, sans-serif
    -webkit-font-smoothing  : antialiased
    -moz-osx-font-smoothing : grayscale
    text-align              : center
    color                   : #2c3e50
    margin-top              : 20px

    h2
      margin-bottom : 0

    .teams
      [data-id]:before
        content             : ''
        background          : url(./assets/tLogo20x-sprite@x2.new.png) no-repeat
        background-size     : 318px 299px
        width               : 20px
        height              : 25px
        display             : inline-block
        margin-right        : 5px
        vertical-align      : middle

      $positions: 39 -200px -224px, 37 -238px -100px, 34 -158px -75px, 36 -198px -125px, 38 0px -49px, 42 -100px -149px, 35 -258px -75px, 40 -218px -100px, 33 -298px -100px, 49 -80px -174px, 46 -20px -149px, 720 -140px -149px, 45 -258px -50px, 41 -40px -174px, 47 -200px -249px, 52 -180px -224px, 68 -278px -175px, 51 -278px -200px, 44 -100px -224px, 43 -158px -100px, 756 -220px -224px, 50 -60px -99px, 725 -198px 0px, 58 -180px -199px, 64 -200px -199px, 708 -100px -99px, 699 -98px -25px, 703 -118px 0px, 753 -80px -224px, 721 -178px 0px, 736 -160px -174px, 57 -298px -150px, 770 -80px -249px, 711 -40px -124px, 735 -120px -174px, 777 -278px -150px, 714 -158px 0px, 1030 -80px -199px, 775 -278px -50px, 681 -138px -50px, 2537 -20px -224px, 1247 -40px -199px, 738 -218px -50px, 759 -258px -100px, 713 -80px -124px, 740 -20px -23px, 751 -238px -175px, 766 -40px -249px, 745 -218px -125px, 741 -218px -150px, 776 -278px -125px, 769 -140px -249px, 774 -278px -25px, 712 -20px -124px, 760 -258px -125px, 707 -80px -99px, 723 -178px -100px, 739 -218px -75px, 743 -20px -199px, 729 -20px -174px, 3223 -278px -100px, 734 -100px -174px, 737 -218px 0px, 726 -198px -25px, 710 -278px 0px, 732 -60px -174px, 700 0px -74px, 784 -298px -125px, 1031 -238px -25px, 704 0px -99px, 715 -158px -25px, 761 -258px -200px, 722 -178px -75px, 752 0px -224px, 772 -220px -249px, 702 -80px -74px, 781 -298px -25px, 692 0px -149px, 2476 -298px -50px, 709 -138px -25px, 698 -78px -25px, 701 -40px -74px, 750 -60px -224px, 727 -198px -100px, 2382 -178px -25px, 696 -20px -49px, 1029 -60px -149px, 2340 -20px -249px, 2861 -278px -225px, 3200 -298px -175px, 2389 -298px -175px, 2857 -140px -199px, 2744 0px -174px, 1784 -180px -174px, 2397 -238px -125px, 2387 -258px 0px, 2585 -60px -124px, 748 -238px -50px, 771 -120px -224px, 697 -78px 0px, 749 -238px -75px, 2386 -98px 0px, 768 -160px -249px, 762 0px -249px, 705 0px -124px, 2576 -198px -75px, 744 -120px -199px, 2529 -178px -50px, 780 -298px 0px, 3674 -60px -249px

      @each $id, $posx, $posy in $positions
        [data-id="#{$id}"]:before
          background-position : $posx $posy
</style>