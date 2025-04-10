<template>
  <div class="partner-list">
    <PartnersPartnerListItem
      v-for="(item, index) in partners"
      :key="index"
      :partner="item"
      :palette="palette"
    />
  </div>
</template>

<script>
export default {

  props: [
    'partners',
    'palette'
  ]

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.partner-list {
  display: flex;
  gap: 30px;
  max-width: 1280px;

  @include mixins.media-query(small) {
    flex-direction: column;
    gap: 60px;
  }

  @include mixins.media-query(medium-up) {
    
  }
}

</style>

