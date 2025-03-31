


<template>
  <div :class="classObject" :style="styleObject">
    <svg width="565" height="290" viewBox="0 0 565 290" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path :d="path" :fill="fill" />
      <path :d="gradientPath" :fill="gradientFill"/>
      <defs>
        <linearGradient id="paint0_linear_52_7057" x1="30.9714" y1="-13.1857" x2="30.9714" y2="66.3707" gradientUnits="userSpaceOnUse">
          <stop stop-color="#CFE79E" stop-opacity="0"/>
          <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
    </svg>
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
      dead: false,
      index: Math.floor(Math.random() * 1),
      targetPosition: {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
      }
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
        'banner-explosion-puff',
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

    fill() {
      return this.palette[this.index % this.palette.length]
    },

    path() {
      const paths = [
        "M8.33563 24.9394L10.8654 22.8675C13.6257 20.6069 15.8656 17.7657 17.4229 14.5556C24.3383 0.300051 42.5434 -3.81375 55.5819 5.18848C58.0245 6.87489 60.1457 8.2614 61.6825 9.13341C63.71 10.2838 65.3189 13.4212 66.5814 17.5386C71.952 35.0537 58.7376 51.9792 41.3376 57.7118L28.6333 61.8973C20.4111 64.6062 11.3666 62.1057 5.70352 55.558C-2.19155 46.4296 -1.00154 32.5865 8.33563 24.9394Z"
      ]

      return paths[this.index]
    },

    gradientPath() {
      const paths = [
        "M8.33563 24.9394L10.8654 22.8675C13.6257 20.6069 15.8656 17.7657 17.4229 14.5556C24.3383 0.300051 42.5434 -3.81375 55.5819 5.18848C58.0245 6.87489 60.1457 8.2614 61.6825 9.13341C63.71 10.2838 65.3189 13.4212 66.5814 17.5386C71.952 35.0537 58.7376 51.9792 41.3376 57.7118L28.6333 61.8973C20.4111 64.6062 11.3666 62.1057 5.70352 55.558C-2.19155 46.4296 -1.00154 32.5865 8.33563 24.9394Z"
      ]

      return paths[this.index]
    },

    gradientFill() {
      return 'url(#paint'+this.index+'_linear_0_1)'
    },

    styleObject() {
      const result = {
        transitionDuration: (Math.round(Math.random()*200) + 50)+'ms'
      }

      let x = '0'
      let y = '0'
      let opacity = 1

      if(this.moving) {
        x = (this.targetPosition.x * 100)
        y = (this.targetPosition.y * 100)
        opacity = 0
      }

      result.transform = 'translate('+x+'%, '+y+'%)'
      result.opacity = opacity

      return result
    },

    innerStyleObject() {
      const result = {

      }

      if(this.moving) {

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

.banner-explosion-puff {
  position: absolute;
  transition-timing-function: ease-out;
  pointer-events: none;

  .inner {
    transform: translate(-50%, -50%);
  }

  &.-half-dead {
    // opacity: 0;
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
