<template>
  <div
    class="prize-list-item" 
    @mouseenter="hover" 
    @mouseleave="unhover"
  >
    <PrizesPrizeVisualsOne
      v-if="prize.name == '1'"
      :palette="palette"
    />
    <PrizesPrizeVisualsTwo 
      v-if="prize.name == '2'"
      :palette="palette" 
    />
    <PrizesPrizeVisualsThree 
      v-if="prize.name == '3'" 
      :palette="palette"
    />
    <PrizesPrizeVisualsFour 
      v-if="prize.name == '4'" 
      :palette="palette"
    />
    <p v-html="prize.description" />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'prize',
    'color'
  ],

  data() {
    return {
      hovering: false
    }
  },

  computed: {

  },

  methods: {
    hover() {
      this.hovering = true
    },

    unhover() {
      this.hovering = false
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.prize-list-item {
  position: relative;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 15px 40px 15px;
  box-shadow: -8px 8px 0 rgba(black, 0.07);
  flex-grow: 1;
  transition: all 250ms animations.$ease;
  box-sizing: border-box;
  max-width: 425px;

  h3 {
    text-align: center;
    font-weight: 900;
    @include mixins.r('font-size', 22, 27);
  }

  p {
    margin: 10px 0 0 0;
    text-align: center;
    color: rgba(black, 0.75);
    @include mixins.r('font-size', 13, 15);

    a {
      color: black;

      &:hover {
        color: var(--palette-0);
        cursor: pointer;
      }
    }
  }

  @include mixins.media-query(medium-down) {
    flex-basis: 70%;
  }

  @include mixins.media-query(large-mega) {
    flex-basis: 35%;
    justify-content: center;

    &:nth-child(3),
    &:nth-child(4) {
      margin-top: 75px;
    }
  }

  @include mixins.media-query(mega) {
    flex-basis: 20%;
    justify-content: center;
  }
}

</style>


