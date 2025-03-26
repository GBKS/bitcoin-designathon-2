<template>
  <div :class="classObject" :style="styleObject">
    <div class="inner" :style="innerStyleObject">
      <div class="inner-two" :style="innerTwoStyleObject" />
    </div>
  </div>
</template>

<script>
export default {

  props: [
    'info',
    'bannerSize',
    'palette'
  ],

  data() {
    return {
      moving: false,
      halfDead: false,
      dead: false
    }
  },

  mounted() {
    setTimeout(this.animate.bind(this), 5)
    // setTimeout(this.midlife.bind(this), Math.round(this.info.duration/2))
    setTimeout(this.die.bind(this), this.info.duration)
  },

  computed: {
    classObject() {
      const c = [
        'banner-circle',
        '-color-' + this.info.color
      ]

      if(this.moving) {
        c.push('-moving')
      }

      if(this.halfDead) {
        c.push('-half-dead')
      }

      if(this.dead) {
        c.push('-dead')
      }

      return c.join(' ')
    },

    width() {
      return 50;
    },

    height() {
      return 50;
    },

    styleObject() {
      const result = {
        transitionDuration: this.info.duration+'ms'
      }

      let x = Math.round(this.bannerSize.width * this.info.startX)
      let y = Math.round(this.bannerSize.height * this.info.startY)

      if(this.moving) {
        x = Math.round(this.bannerSize.width * this.info.endX)
        y = Math.round(this.bannerSize.height * this.info.endY)
      }

      result.transform = 'translate('+x+'px, '+y+'px)'

      return result
    },

    innerStyleObject() {
      const result = {

      }

      if(this.moving) {

      }

      return result
    },

    innerTwoStyleObject() {
      const result = {
        transitionDuration: this.info.duration+'ms',
        width: '2px',
        height: '2px',
        backgroundColor: this.palette[this.info.color],
        animationDuration: this.info.pulseDuration+'ms'
      }

      if(this.moving) {
        result.width = Math.round(this.info.size * this.bannerSize.width)+'px'
        result.height = Math.round(this.info.size * this.bannerSize.width)+'px'
      }

      return result
    }
  },

  methods: {
    animate() {
      this.moving = true
    },

    midlife() {
      this.halfDead = true
    },

    die() {
      this.dead = true

      // this.$emit('die', this.info.id)
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";

.banner-circle {
  position: absolute;
  transition-timing-function: ease-out;
  pointer-events: none;

  .inner {
    transform: translate(-50%, -50%);
  }

  .inner-two {
    border: 1px solid black;
    border-radius: 50%;
    box-shadow: -8px 8px 0 rgba(black, 0.07);
    transition-timing-function: animations.$easeOutBack;
    animation: circleHover 1000ms infinite ease-in-out;
  }

  &.-half-dead {
    // opacity: 0;
  }

  &.-dead .inner-two {

  }
}

@keyframes circleHover {
  0% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.1, 1.1);
  }

  100% {
    transform: scale(1, 1);
  }
}

</style>
