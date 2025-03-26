<template>
  <div class="partner-list-item">
    <a
      :href="partner.link" 
      target="_blank" 
      rel="nofollow noindex"
    >
      <img
        :src="'/assets/images/' + partner.image"
        :srcset="srcset"
        alt=""
      />
      <div class="hover" :style="hoverStyle" />
    </a>
    <h3>
      <a
        :href="partner.link"
        target="_blank" 
        rel="nofollow noindex"
      >{{ partner.name }}</a>
    </h3>
    <p v-html="partner.description" />
  </div>
</template>

<script>
export default {

  props: [
    'partner',
    'palette'
  ],

  computed: {
    srcset() {
      return `/images/${this.partner.image} 1x, /images/${this.partner.retina} 2x`
    },

    hoverStyle() {
      return {
        borderColor: this.palette[2]
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.partner-list-item {
  display: flex;
  flex-direction: column;
  flex-basis: 20%;
  flex-grow: 1;

  > a {
    display: block;
    position: relative;
    // border: 1px solid black;

    .hover {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 2px solid black;
      border-radius: 15px;
      pointer-events: none;
      transition: all 250ms animations.$ease;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      border-radius: 15px;
      box-shadow: -8px 8px 0 rgba(black, 0.07);
    }
    
    &:hover {
      .hover {
        border-width: 8px;
      }
    } 
  }

  h3 {
    margin: 20px 0 0 0;
    font-weight: 900;
    text-align: center;
    @include mixins.r('font-size', 18, 24);

    a {
      color: var(--front);
      text-decoration: none;
      transition: all 100ms animations.$ease;

      &:hover {
        color: var(--palette-0);
      }
    }
  }

  p {
    margin: 5px 0 0 0;
    text-align: center;
    @include mixins.r('font-size', 15, 18);
  }
}

</style>



