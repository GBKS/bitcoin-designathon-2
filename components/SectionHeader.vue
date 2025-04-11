<script setup>

const props = defineProps([
  'title',
  'description',
  'link',
  'linkLabel',
  'color',
  'textColor',
  'palette'
])

</script>

<template>
  <div class="section-header">
    <h1
      v-html="title"
    />
    <p 
      v-if="description" 
      v-html="description"
    />
    <SuperButton
      v-if="link"
      :link="link"
      :label="linkLabel"
      :color="color"
      :textColor="textColor"
    />
  </div>
</template>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.section-header {
  text-align: center;
  max-width: 900px;

  h1 {
    font-weight: 900;
    color: var(--front);
    line-height: 1.6;
    text-wrap: balance;
    @include mixins.r('font-size', 24, 36);

    a {
      color: var(--front);
      transition: all 100ms animations.$ease;

      &:hover {
        color: var(--palette-0);
      }
    }
  }

  p {
    margin-top: 10px;
    text-wrap: balance;
    line-height: 1.6;
    color: rgba(var(--frontRGB), 0.75);
    @include mixins.r('font-size', 18, 22);

    a {
      color: var(--front);
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
