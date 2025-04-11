<script setup>

const props = defineProps([
  'sponsors',
  'palette',
  'color'
])

</script>

<template>
  <div class="sponsor-list">
    <PrizesSponsorListItem
      v-for="item in sponsors"
      :key="item.id"
      :info="item"
      :palette="palette"
      :color="color"
    />
  </div>
</template>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.sponsor-list {
  margin-top: 10px;

  @include mixins.media-query(small) {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  @include mixins.media-query(medium) {
    max-width: 800px;

    // 2x2 grid layout centered
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 50px;
  }

  @include mixins.media-query(large) {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 50px;
    max-width: 1450px;
  }
}

</style>