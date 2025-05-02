<script setup>

const props = defineProps([
  'info'
])

const classObject = computed(() => {
  const c = ['sponsor-details']

  if(props.info.url) {
    c.push('-link')
  }

  return c.join(' ')
})

const sponsorSourceSet = computed(() => {
  return `/images/sponsors/${props.info.image}.png 1x, /images/sponsors/${props.info.image}@2x.png 2x`
})
</script>

<template>
  <div :class="classObject">
    <img
      :src="`/images/sponsors/${info.image}.png`"
      :srcset="sponsorSourceSet"
      width="50"
      height="50"
      :alt="info.name"
      loading="lazy"
    >
    <div class="right">
      <p>Sponsor</p>
      <h5>
        <a
          v-if="info.url"
          :href="info.url"
          target="_blank"
          rel="nofollow noindex"
        >{{ info.name }}</a>
        <template v-else>
          {{ info.name }}
        </template>
      </h5>
    </div>
  </div>
</template>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.sponsor-details {
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    border-radius: 15px;
  }

  .right {
    p {
      color: rgba(black, 0.75);
      @include mixins.r('font-size', 15, 17);
    }

    h5 {
      color: rgba(black, 1);
      @include mixins.r('font-size', 15, 19);

      a {
        text-decoration: none;
        color: rgba(black, 1);

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

</style>


