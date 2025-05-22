<script setup>

const props = defineProps([
  'palette',
  'info',
  'color'
])


const classObject = computed(() => {
  const c = ['sponsor-list-item']

  if(props.info.url) {
    c.push('-link')
  }

  return c.join(' ')
})

const imageSourceSet = computed(() => {
  return `/images/prizes/${props.info.image}.jpg 1x, /images/prizes/${props.info.image}@2x.jpg 2x`
})

const sponsorSourceSet = computed(() => {
  return `/images/sponsors/${props.info.sponsor.image}.png 1x, /images/sponsors/${props.info.sponsor.image}@2x.png 2x`
})
</script>

<template>
  <div :class="classObject">
    <img
      :src="`/images/prizes/${info.image}.jpg`"
      :srcset="imageSourceSet"
      width="300"
      height="225"
      :alt="info.title"
      loading="lazy"
    >
    <div class="info">
      <h3>{{ info.title }}</h3>
      <p class="-description" v-html="info.description" />
      <p class="-prize" v-html="info.prize" />
      <div class="sponsors" v-if="info.sponsors">
        <PrizesSponsorDetails
          v-for="(sponsor, index) in info.sponsors"
          :key="index"
          :info="sponsor"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.sponsor-list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;
  flex-grow: 1;
  max-width: 325px;
  transition: all 250ms animations.$ease;
  box-sizing: border-box;
  background-color: white;
  border-radius: 25px;
  box-shadow: 8px 8px 0 rgba(black, 0.07);
  border: 2px solid black;

  > img {
    width: 100%;
    height: auto;
  }

  .info {
    padding: 20px 20px 20px 20px;

    h3 {
      font-family: 'MPlusRounded', sans-serif;
      font-weight: 900;
      color: black;
      @include mixins.r('font-size', 22, 30);
    }

    > p {
      color: rgba(black, 0.75);

      &.-description {
        margin-top: 5px;
        @include mixins.r('font-size', 15, 19);
      }

      &.-prize {
        margin-top: 15px;
        @include mixins.r('font-size', 15, 17);
      }

      a {
        color: black;

        &:hover {
          color: var(--primary);
        }
      }
    }

    .sponsors {
      margin-top: 25px;
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  @include mixins.media-query(medium) {
    flex-basis: 40%;
  }

  @include mixins.media-query(large) {
    flex-basis: 325px;
    flex-grow: 1;
    flex-shrink: 1;
  }
}

</style>


