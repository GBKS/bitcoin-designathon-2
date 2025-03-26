<template>
  <div class="prize-list">
    <PrizesPrizeListItem
      v-for="item in prizes"
      :key="item.id"
      :prize="item"
      :palette="palette"
      :color="color"
    />
  </div>
</template>

<script>
export default {

  props: [
    'prizes',
    'palette',
    'color'
  ],

  data() {
    return {

    }
  },

  computed: {

  },

  methods: {

  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.prize-list {
  display: flex;
  @include mixins.r('margin-top', 80, 80);

  @include mixins.media-query(medium-down) {
    flex-direction: column;
    gap: 120px;
    align-items: stretch;
  }

  @include mixins.media-query(large-mega) {
    gap: 30px;
    align-items: stretch;
    justify-content: center;
    flex-wrap: wrap;
  }

  @include mixins.media-query(mega) {
    gap: 75px;
    align-items: stretch;
  }
}

</style>

