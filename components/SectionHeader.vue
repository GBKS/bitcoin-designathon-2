<template>
  <div class="section-header">
    <h1>{{ title }}</h1>
    <p 
      v-if="description" 
      v-html="description"
    />
    <SuperButton
      v-if="link"
      :link="link"
      :label="linkLabel"
      :color="color"
    />
  </div>
</template>

<script>
export default {

  props: [
    'title',
    'description',
    'link',
    'linkLabel',
    'color'
  ]

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.section-header {
  text-align: center;
  max-width: 900px;

  h1 {
    font-weight: 900;
    color: var(--front);
    @include mixins.r('font-size', 24, 36);
  }

  p {
    margin-top: 10px;
    @include mixins.r('font-size', 18, 20);

    a {
      color: var(--palette-0);
      transition: all 100ms animations.$ease;

      &:hover {
        color: var(--palette-0);
      }
    }
  }

  .super-button {
    margin-top: 30px;
  }
}

</style>
