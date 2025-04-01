<template>
  <div :class="classObject" :style="styleObject" ref="canvas">
    <div class="title">
      <SealButton
        :color="palette.seal"
        :shadowOpacity="palette.typeShadowOpacity"
      />
      <div class="letters" :style="letterStyle">
        <BannerDotsLeft
          :palette="palette"
          :moving="moving"
          :bannerSize="bannerSize"
          :isMobile="isMobile"
          @hoverLetter="hoverLetter"
          @unhoverLetter="unhoverLetter"
        />
        <BannerTitle
          :palette="palette"
          :moving="moving"
          :bannerSize="bannerSize"
          :isMobile="isMobile"
          @hoverLetter="hoverLetter"
          @unhoverLetter="unhoverLetter"
        />
        <BannerDotsRight
          :palette="palette"
          :moving="moving"
          :bannerSize="bannerSize"
          :isMobile="isMobile"
          @hoverLetter="hoverLetter"
          @unhoverLetter="unhoverLetter"
        />
      </div>
      <p v-html="copy.text" :style="copyStyle" />
      <div class="options" v-if="showButtons">
        <SuperButton
          link="https://discord.gg/K7aQ5PErht"
          label="Bitcoin Design Discord"
          size="small"
          :color="palette.button.background"
          :textColor="palette.button.label"
        />
        <SuperIconButton
          v-if="false"
          link="nostr:npub13s5mxgws70rpxsug96jfvglggackjrxs2ehypwg0prjaxsek42sqd9l03e"
          icon="nostr"
          size="small"
          :color="palette.button.background"
          :textColor="palette.button.label"
        />
      </div>
    </div>
  </div>
</template>

<script>
import copy from "~/assets/copy.json";

export default {

  props: [
    'isMobile',
    'palette'
  ],

  data() {
    let bannerSize

    if(process.browser) {
      const canvas = this.$refs.canvas
      if(canvas) {
        bannerSize = {
          width: canvas.offsetWidth,
          height: canvas.offsetHeight
        }
      }
    }

    return {
      copy: copy.banner,
      moving: false,
      showButtons: !false,
      bannerSize,
      idCounter: 0
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize.bind(this))

    this.onResize()

    setTimeout(this.animate.bind(this), 100)
  },

  computed: {
    classObject() {
      const c = ['banner']

      if(this.moving) {
        c.push('-moving')
      }

      if(this.palette.length > 5) {
        c.push('-'+this.palette[5])
      }

      return c.join(' ')
    },

    styleObject() {
      const s = {}

      if(this.palette.length > 4) {
        // s.backgroundColor = this.palette[4]
      }

      return s
    },

    letterStyle() {
      return {
        filter: "drop-shadow(20px 20px 0 rgb(0 0 0 / " + this.palette.typeShadowOpacity + "))"
      }
    },

    copyStyle() {
      return {
        color: this.palette.bodyText
      }
    },

    linkStyle() {
      return {
        backgroundColor: this.palette[1]
      }
    }
  },

  methods: {
    animate() {
      this.moving = true
    },

    onResize() {
      if(process.browser) {
        const canvas = this.$refs.canvas
        if(canvas) {
          this.bannerSize = {
            width: canvas.offsetWidth,
            height: canvas.offsetHeight
          }
        }
      }
    },

    hoverLetter(letter) {
      this.$emit('hoverLetter', letter);
    },

    unhoverLetter(letter) {
      this.$emit('unhoverLetter', letter);
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.banner {
  // position: relative;
  // overflow-x: hidden;
  // overflow-y: visible;

  .title {
    // position: absolute;
    // left: 0;
    // top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;

    > a {
      transform: translateY(-50px);
      opacity: 0;
      transition-delay: 1800ms;
      position: relative;
      z-index: 1;
      
      svg {
        @include mixins.rs(
          ('width', 100, 160),
          ('height', 100, 160)
        );
      }
    }

    .letters {      
      flex-grow: 1;
      flex-basis: 10%;
      // border: 1px solid red;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 400ms animations.$ease;
      position: relative;
    }

    @include mixins.media-query(small) {
      min-height: 700px;
      // height: 80dvh;
      padding-top: 30px;
      padding-bottom: 30px;
      box-sizing: border-box;

      .letters {
        flex-direction: column;
      }
    }

    @include mixins.media-query(medium-up) {
      // min-height: 900px;
      height: 100vh;
      padding-top: 40px;
      padding-bottom: 40px;
      box-sizing: border-box;
    }

    p {
      margin: 0;
      font-weight: 600;
      text-align: center;
      color: rgba(var(--frontRGB), 0.75);
      transition: color 400ms animations.$easeOutCubic, opacity 1000ms animations.$easeOutCubic 1900ms, transform 1000ms animations.$easeOutCubic 1900ms;
      transform: translateY(150px);
      opacity: 0;
      @include mixins.rs(
        ('margin-top', 10, 20),
        ('font-size', 18, 27)
      );
    }

    .options {
      display: flex;
      gap: 30px;
      transition: all 1000ms animations.$easeOutCubic;
      transition-delay: 2200ms;
      transform: translateY(100px);
      opacity: 0;
      @include mixins.r('margin-top', 30, 20);

      a:first-child {
        display: flex;
        align-items: center;
      }
    }
  }

  &.-dark {
    p {
      color: white;
    }
  }

  &.-moving {
    .title {
      > a {
        opacity: 1;
        transform: translateY(0);
      }

      p {
        opacity: 1;
        transform: translateY(0);
      }

      .options {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  @include mixins.media-query(small) {
    .options {
      // flex-direction: column;

      a:first-child {
        padding-left: 20px;
        padding-right: 20px;
      }
    }
  }
}

@keyframes buttonHover {
  0% {
    transform: scale(1, 1);
  }

  100% {
    transform: scale(1.05, 1.05);
  }
}

// Disable animation when user prefers reduced motion
@media (prefers-reduced-motion: reduce) {
  .banner {
    .title {
      > a {
        transform: translateY(0);
        opacity: 1;
        transition: none;
      }

      .letters {
        transition: none;
      }

      p {
        transform: translateY(0);
        opacity: 1;
        transition: none;
      }

      .options {
        transform: translateY(0);
        opacity: 1;
        transition: none;
      }
    }
  }
}

</style>
