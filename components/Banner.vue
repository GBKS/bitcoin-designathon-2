<template>
  <div :class="classObject" :style="styleObject" ref="canvas">
    <BannerCircles
      :palette="palette"
      :bannerSize="bannerSize"
      :isMobile="isMobile"
    />
    <div class="title">
      <a href="https://bitcoin.design" title="Bitcoin Design">
        <img
          src="~/assets/images/seal.svg"
          alt="Bitcoin design community logo"
        />
      </a>
      <BannerTitle
        :palette="palette"
        :moving="moving"
        @hoverLetter="hoverLetter"
        @unhoverLetter="unhoverLetter"
      />
      <p v-html="copy.text" />
      <div class="options" v-if="showButtons">
        <SuperButton
          link="https://discord.gg/K7aQ5PErht"
          label="Bitcoin Design Discord"
          size="small"
          :color="palette[1]"
        />
        <SuperIconButton
          link="nostr:npub13s5mxgws70rpxsug96jfvglggackjrxs2ehypwg0prjaxsek42sqd9l03e"
          icon="nostr"
          size="small"
          :color="palette[1]"
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
      bannerSize
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
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    @include mixins.media-query(small) {
      // min-height: 600px;
      min-height: 100vh;
    }

    @include mixins.media-query(medium-up) {
      // min-height: 900px;
      min-height: 100vh;
    }

    > a {
      margin: 0;
      transition: all 600ms animations.$easeOutBack;
      transform: translateY(50px);
      opacity: 0;
      @include mixins.r('margin-bottom', 20, 40);

      img {
        @include mixins.rs(
          ('width', 120, 160),
          ('height', 120, 160)
        );
      }
    }

    p {
      margin: 0;
      font-weight: 600;
      text-align: center;
      color: rgba(var(--frontRGB), 0.75);
      transition: all 600ms animations.$easeOutBack;
      transform: translateY(-50px);
      opacity: 0;
      @include mixins.rs(
        ('margin-top', 20, 40),
        ('font-size', 18, 27)
      );
    }

    .options {
      display: flex;
      gap: 30px;
      transition:
      background-color 150ms ease-in-out,
      transform 600ms animations.$easeOutBack;
      transform: translateY(-100px);
      opacity: 0;
      @include mixins.r('margin-top', 40, 40);

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

</style>
