<template>
  <div :class="classObject" :style="styleObject">
    <div class="inner" :style="innerStyleObject">
      <svg width="565" height="290" viewBox="0 0 565 290" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path :d="path" :fill="fill" />
        <path :d="gradientPath" :fill="gradientFill"/>
        <defs>
          <linearGradient id="paint0_linear_0_1" x1="399.97" y1="159.548" x2="399.97" y2="254.219" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="paint1_linear_0_1" x1="511.773" y1="37.0402" x2="511.773" y2="148.357" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="paint2_linear_0_1" x1="364.476" y1="-3.47766" x2="364.476" y2="74.288" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="paint3_linear_0_1" x1="31.2673" y1="167.649" x2="31.2673" y2="236.961" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="paint4_linear_0_1" x1="169.065" y1="201.305" x2="169.065" y2="294.291" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
          <linearGradient id="paint5_linear_0_1" x1="111.971" y1="45.8143" x2="111.971" y2="125.371" gradientUnits="userSpaceOnUse">
            <stop stop-color="#CFE79E" stop-opacity="0"/>
            <stop offset="1" stop-color="#CFE79E" stop-opacity="0.25"/>
          </linearGradient>
        </defs>
      </svg>
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
      dead: false,
      index: Math.floor(Math.random() * 6)
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

    fill() {
      return this.palette[this.index % this.palette.length]
    },

    path() {
      const paths = [
        "M372.871 194.197L378.234 189.623C396.787 173.798 425.075 178.205 437.934 198.924L438.584 199.97C442.074 205.594 443.924 212.082 443.924 218.701C443.924 238.317 428.022 254.219 408.406 254.219H394.992C379.896 254.219 366.597 244.29 362.309 229.816C358.482 216.899 362.621 202.94 372.871 194.197Z",
        "M502.131 67.2658C506.028 65.1465 512.786 61.4517 520.192 57.3111C533.806 49.7005 553.81 60.7198 553.81 76.3166C553.81 79.3864 554.579 82.4074 556.045 85.1043L559.168 90.8479C570.561 111.8 563.253 138.731 540.253 145.039C530.202 147.796 519.698 149.306 510.686 147.7C496.586 145.187 483.363 134.555 472.464 122.492C455.342 103.54 468.307 75.7166 493.27 70.3129L494.785 69.9849C497.357 69.4281 499.819 68.5231 502.131 67.2658Z",
        "M347.647 18.0384L352.005 11.0654C357.379 2.46759 367.821 -1.49939 377.548 1.36151C385.169 3.60316 391.054 9.6818 393.048 17.3719L399.72 43.1057C400.976 47.9508 400.435 53.0869 398.196 57.5637C393.446 67.0635 382.279 71.4296 372.346 67.6708L363.219 64.2175C344.625 57.1818 337.11 34.8974 347.647 18.0384Z",
        "M42.4574 175.639C60.2271 185.384 62.3755 210.26 46.3505 222.666C35.6443 230.955 20.4632 230.363 10.3434 221.368C-3.64495 208.934 -1.94149 186.429 13.8965 176.457C22.5312 171.02 33.5107 170.733 42.4574 175.639Z",
        "M158.133 239.924L160.542 241.395C166.504 245.034 174.261 243.496 178.382 237.856C186.266 227.065 203.358 233.162 202.633 246.507L201.674 264.156C201.301 271.012 197.196 277.11 190.985 280.035L176.554 286.831C166.744 291.451 155.219 290.517 146.28 284.378L142.566 281.828C136.604 277.733 133.041 270.964 133.041 263.73V254.003C133.041 241.125 147.14 233.213 158.133 239.924Z",
        "M89.3356 83.9394L91.8654 81.8675C94.6257 79.6069 96.8656 76.7657 98.4229 73.5556C105.338 59.3001 123.543 55.1863 136.582 64.1885C139.024 65.8749 141.146 67.2614 142.683 68.1334C144.71 69.2838 146.319 72.4212 147.581 76.5386C152.952 94.0537 139.738 110.979 122.338 116.712L109.633 120.897C101.411 123.606 92.3666 121.106 86.7035 114.558C78.8084 105.43 79.9985 91.5865 89.3356 83.9394Z",
      ]

      return paths[this.index]
    },

    gradientPath() {
      const paths = [
        "M372.871 194.197L378.234 189.623C396.787 173.798 425.075 178.205 437.934 198.924L438.584 199.97C442.074 205.594 443.924 212.082 443.924 218.701C443.924 238.317 428.022 254.219 408.406 254.219H394.992C379.896 254.219 366.597 244.29 362.309 229.816C358.482 216.899 362.621 202.94 372.871 194.197Z",
        "M502.131 67.2658C506.028 65.1465 512.786 61.4517 520.192 57.3111C533.806 49.7005 553.81 60.7198 553.81 76.3166C553.81 79.3864 554.579 82.4074 556.045 85.1043L559.168 90.8479C570.561 111.8 563.253 138.731 540.253 145.039C530.202 147.796 519.698 149.306 510.686 147.7C496.586 145.187 483.363 134.555 472.464 122.492C455.342 103.54 468.307 75.7166 493.27 70.3129L494.785 69.9849C497.357 69.4281 499.819 68.5231 502.131 67.2658Z",
        "M347.647 18.0384L352.005 11.0654C357.379 2.46759 367.821 -1.49939 377.548 1.36151C385.169 3.60316 391.054 9.6818 393.048 17.3719L399.72 43.1057C400.976 47.9508 400.435 53.0869 398.196 57.5637C393.446 67.0635 382.279 71.4296 372.346 67.6708L363.219 64.2175C344.625 57.1818 337.11 34.8974 347.647 18.0384Z",
        "M42.4574 175.639C60.2271 185.384 62.3755 210.26 46.3505 222.666C35.6443 230.955 20.4632 230.363 10.3434 221.368C-3.64495 208.934 -1.94149 186.429 13.8965 176.457C22.5312 171.02 33.5107 170.733 42.4574 175.639Z",
        "M158.133 239.924L160.542 241.395C166.504 245.034 174.261 243.496 178.382 237.856C186.266 227.065 203.358 233.162 202.633 246.507L201.674 264.156C201.301 271.012 197.196 277.11 190.985 280.035L176.554 286.831C166.744 291.451 155.219 290.517 146.28 284.378L142.566 281.828C136.604 277.733 133.041 270.964 133.041 263.73V254.003C133.041 241.125 147.14 233.213 158.133 239.924Z",
        "M89.3356 83.9394L91.8654 81.8675C94.6257 79.6069 96.8656 76.7657 98.4229 73.5556C105.338 59.3001 123.543 55.1863 136.582 64.1885C139.024 65.8749 141.146 67.2614 142.683 68.1334C144.71 69.2838 146.319 72.4212 147.581 76.5386C152.952 94.0537 139.738 110.979 122.338 116.712L109.633 120.897C101.411 123.606 92.3666 121.106 86.7035 114.558C78.8084 105.43 79.9985 91.5865 89.3356 83.9394Z"
      ]

      return paths[this.index]
    },

    gradientFill() {
      return 'url(#paint'+this.index+'_linear_0_1)'
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
