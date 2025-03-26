<template>
  <div :class="classObject">
    <h3>
      <a
        v-if="sponsor.url"
        :href="sponsor.url"
        target="_blank"
        rel="nofollow noindex"
      >
        <img
          :src="require(`~/assets/images/prizes/${sponsor.image}`)"
          :width="sponsor.width"
          :height="sponsor.height"
          :alt="sponsor.name"
          loading="lazy"
        >
      </a>
      <img
        v-else
        :src="require(`~/assets/images/prizes/${sponsor.image}`)"
        :width="sponsor.width"
        :height="sponsor.height"
        :alt="sponsor.name"
        loading="lazy"
      >
    </h3>
    <p v-html="sponsor.description" />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'sponsor',
    'color'
  ],

  computed: {
    classObject() {
      const c = ['sponsor-list-item']

      if(this.sponsor.url) {
        c.push('-link')
      }

      return c.join(' ')
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.sponsor-list-item {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  transition: all 250ms animations.$ease;
  box-sizing: border-box;

  h3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    // @include mixins.r('font-size', 22, 27);
    // font-weight: 900;
    line-height: 0;
    background-color: white;
    border: 1px solid black;
    border-radius: 15px;
    padding: 20px 20px 20px 20px;
    box-shadow: -8px 8px 0 rgba(black, 0.07);
    transition: all 150ms animations.$ease;

    a {
      color: black;
      text-decoration: none;
    }
  }

  p {
    margin: 10px 0 0 0;
    text-align: center;
    @include mixins.r('font-size', 15, 18);
    // color: rgba(black, 0.75);

    a {
      color: black;
    }
  }

  > a {
    margin-top: 20px;
  }

  &.-link {
    h3 {
      &:hover {
        transform: translate(-3px, 5px);
        box-shadow: -4px 4px 0 rgba(black, 0.15);

        a {
          color: var(--palette-0);
          cursor: pointer;
        }
      }
    }
  }

  @include mixins.media-query(medium) {
    flex-basis: 40%;
  }

  @include mixins.media-query(large) {
    flex-basis: 26%;
  }
}

</style>


