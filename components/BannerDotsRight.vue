<template>
  <div :class="classObject">
    <svg width="222" height="255" viewBox="0 0 222 255" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="hs" @click="clickLetter('7')" @mouseenter="hoverLetter('7')" @mouseleave="unhoverLetter('7')" style="transform-origin: 26.1% 85.5%;">
        <g class="wrap">
          <path 
            d="M30.3997 194.492L35.7628 189.918C54.3155 174.094 82.6034 178.501 95.4629 199.219L96.1124 200.265C99.6032 205.889 101.453 212.377 101.453 218.996C101.453 238.612 85.5509 254.514 65.9347 254.514H52.5206C37.4244 254.514 24.1263 244.585 19.8377 230.111C16.0105 217.194 20.1499 203.235 30.3997 194.492Z"
            :fill="colors[0]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M30.3997 194.492L35.7628 189.918C54.3155 174.094 82.6034 178.501 95.4629 199.219L96.1124 200.265C99.6032 205.889 101.453 212.377 101.453 218.996C101.453 238.612 85.5509 254.514 65.9347 254.514H52.5206C37.4244 254.514 24.1263 244.585 19.8377 230.111C16.0105 217.194 20.1499 203.235 30.3997 194.492Z"
            fill="url(#paint0_linear_145_8684)"
          />
        </g>
      </g>
      <g id="es" @click="clickLetter('8')" @mouseenter="hoverLetter('8')" @mouseleave="unhoverLetter('8')" style="transform-origin: 78.8% 41.6%;">
        <g class="wrap">
          <path 
            d="M159.66 67.5611C163.557 65.4418 170.314 61.7469 177.721 57.6064C191.335 49.9958 211.339 61.0151 211.339 76.6118C211.339 79.6817 212.107 82.7027 213.574 85.3996L216.697 91.1432C228.09 112.095 220.781 139.027 197.782 145.334C187.731 148.091 177.227 149.601 168.215 147.995C154.115 145.483 140.892 134.85 129.993 122.787C112.87 103.835 125.836 76.0119 150.798 70.6082L152.314 70.2802C154.886 69.7234 157.348 68.8184 159.66 67.5611Z"
            :fill="colors[1]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M159.66 67.5611C163.557 65.4418 170.314 61.7469 177.721 57.6064C191.335 49.9958 211.339 61.0151 211.339 76.6118C211.339 79.6817 212.107 82.7027 213.574 85.3996L216.697 91.1432C228.09 112.095 220.781 139.027 197.782 145.334C187.731 148.091 177.227 149.601 168.215 147.995C154.115 145.483 140.892 134.85 129.993 122.787C112.87 103.835 125.836 76.0119 150.798 70.6082L152.314 70.2802C154.886 69.7234 157.348 68.8184 159.66 67.5611Z"
            fill="url(#paint1_linear_145_8684)"
          />
        </g>
      </g>
      <g id="is" @click="clickLetter('9')" @mouseenter="hoverLetter('9')" @mouseleave="unhoverLetter('9')" style="transform-origin: 13.8% 61%;">
        <g class="wrap">
          <path 
            d="M5.17589 18.3337L9.53409 11.3607C14.9078 2.76287 25.3496 -1.20411 35.0766 1.65679C42.6981 3.89844 48.5831 9.97709 50.5768 17.6672L57.2485 43.401C58.5047 48.2461 57.9634 53.3821 55.725 57.859C50.9751 67.3588 39.8082 71.7248 29.8745 67.9661L20.7478 64.5128C2.15339 57.4771 -5.36107 35.1927 5.17589 18.3337Z"
            :fill="colors[2]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M5.17589 18.3337L9.53409 11.3607C14.9078 2.76287 25.3496 -1.20411 35.0766 1.65679C42.6981 3.89844 48.5831 9.97709 50.5768 17.6672L57.2485 43.401C58.5047 48.2461 57.9634 53.3821 55.725 57.859C50.9751 67.3588 39.8082 71.7248 29.8745 67.9661L20.7478 64.5128C2.15339 57.4771 -5.36107 35.1927 5.17589 18.3337Z"
            fill="url(#paint2_linear_145_8684)"
          />
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear_145_8684" x1="22.0044" y1="-3.18237" x2="22.0044" y2="74.5833" gradientUnits="userSpaceOnUse">
          <stop :stop-color="gradientColors[0]" stop-opacity="0"/>
          <stop offset="1" :stop-color="gradientColors[0]" stop-opacity="0.25"/>
        </linearGradient>
        <linearGradient id="paint1_linear_145_8684" x1="22.0044" y1="-3.18237" x2="22.0044" y2="74.5833" gradientUnits="userSpaceOnUse">
          <stop :stop-color="gradientColors[1]" stop-opacity="0"/>
          <stop offset="1" :stop-color="gradientColors[1]" stop-opacity="0.25"/>
        </linearGradient>
        <linearGradient id="paint2_linear_145_8684" x1="22.0044" y1="-3.18237" x2="22.0044" y2="74.5833" gradientUnits="userSpaceOnUse">
          <stop :stop-color="gradientColors[2]" stop-opacity="0"/>
          <stop offset="1" :stop-color="gradientColors[2]" stop-opacity="0.25"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script>

export default {

  props: [
    'palette',
    'moving',
    'bannerSize',
    'isMobile'
  ],

  data() {
    const colors = ['', '', '', '', '', '', '', '', '', '', '']
    const gradientColors = ['', '', '', '', '', '', '', '', '', '', '']

    if(this.palette?.type && this.palette?.typeGradient) {
      let i=0
      for(; i<colors.length; i++) {
        colors[i] = this.palette.type[i % this.palette.type.length]
      }

      for(i=0; i<gradientColors.length; i++) {
        gradientColors[i] = this.palette.typeGradient[i % this.palette.typeGradient.length]
      }
    }

    const result = {
      hoveredLetter: null,
      colors,
      gradientColors
    }

    return result
  },

  watch: {
    palette() {
      let i=0
      for(; i<this.colors.length; i++) {
        this.colors[i] = this.palette.type[i % this.palette.type.length]
      }

      for(i=0; i<this.gradientColors.length; i++) {
        this.gradientColors[i] = this.palette.typeGradient[i % this.palette.typeGradient.length]
      }
    }
  },

  mounted() {

  },

  computed: {
    classObject() {
      const c = [
        'banner-dots-right'
      ]

      if(this.moving) {
        c.push('-moving')
      }

      return c.join(' ')
    },

    strokeStyle() {
      let result

      if(process.browser && this.palette.typeOutline) {
        result = 'black'
      }

      return result
    },

    strokeWidthStyle() {
      let result

      if(process.browser && this.palette.typeOutlineWidth) {
        result = this.palette.typeOutlineWidth
      }

      return result
    }
  },

  methods: {
    clickLetter(letter) {
      this.$emit('hoverLetter', letter-1)
    },

    hoverLetter(letter) {
      this.$emit('hoverLetter', letter-1)
    },

    unhoverLetter(letter) {
      this.$emit('unhoverLetter', letter-1)
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.banner-dots-right {
  // position: absolute;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.871;
  container-type: size;
  container-name: aspect-container;
  box-sizing: border-box;
  padding-right: 30px;

  svg {
    overflow: visible;
    width: auto;
    height: 50%;
  }

  @container aspect-container (aspect-ratio <= 2.0765) {
    svg {
      width: 100%;
      height: auto;
    }
  }

  @include mixins.media-query(small) {
    justify-content: center;

    svg {
      width: 20vw;
      transform: translateY(32vw);
    }
  }

  @include mixins.media-query(medium-up) {
    width: auto;
    height: 48.4%;
  }

  path {
    transition: all 150ms ease-in-out;
  }

  #df, #ds,
  #ef, #es,
  #sf, #ss,
  #if, #is,
  #gf, #gs,
  #nf, #ns,
  #af, #as,
  #tf, #ts,
  #hf, #hs,
  #of, #os,
  #nf2, #ns2 {
    transform: scale(0.01, 0.01);
    // animation: letter-hover 5018ms ease-in-out infinite;

    .wrap {
      transform-origin: center center;
      // animation: bubble 2000ms animations.$easeOutBack;
    }
  }

  &.-moving {
    #df, #ds,
    #ef, #es,
    #sf, #ss,
    #if, #is,
    #gf, #gs,
    #nf, #ns,
    #af, #as,
    #tf, #ts,
    #hf, #hs,
    #of, #os,
    #nf2, #ns2 {
      animation: letter-hover 5018ms ease-in-out infinite;

      .wrap {
        opacity: 0;
        animation: bubble 2000ms animations.$easeOutCubic;
        animation-fill-mode: forwards;
      }
    }

    #df, #ds {
      animation-duration: 5000ms;

      .wrap {
        animation-delay: 250ms;
      }
    }

    #ef, #es {
      animation-duration: 4837ms;
      animation-delay: -1200ms;

      .wrap {
        animation-delay: 200ms;
      }
    }

    #sf, #ss {
      animation-duration: 5200ms;
      animation-delay: -450ms;

      .wrap {
        animation-delay: 150ms;
      }
    }

    #if, #is {
      animation-duration: 5100ms;
      animation-delay: -3300ms;

      .wrap {
        animation-delay: 100ms;
      }
    }

    #gf, #gs {
      animation-duration: 4900ms;
      animation-delay: -1276ms;

      .wrap {
        animation-delay: 50ms;
      }
    }

    #nf, #ns {
      animation-duration: 5300ms;
      animation-delay: -1589ms;

      .wrap {

      }
    }

    #af, #as {
      animation-duration: 5050ms;
      animation-delay: -4761ms;

      .wrap {
        animation-delay: 50ms;
      }
    }

    #tf, #ts {
      animation-duration: 4850ms;
      animation-delay: -3651ms;

      .wrap {
        animation-delay: 100ms;
      }
    }

    #hf, #hs {
      animation-duration: 5125ms;
      animation-delay: -1786ms;

      .wrap {
        animation-delay: 150ms;
      }
    }

    #of, #os {
      animation-duration: 4812ms;
      animation-delay: -2653ms;

      .wrap {
        animation-delay: 200ms;
      }
    }

    #nf2, #ns2 {
      animation-duration: 5018ms;
      animation-delay: -198ms;

      .wrap {
        animation-delay: 250ms;
      }
    }
  }
}

@keyframes bubble {
  0% {
    opacity: 0;
    transform: translateY(200px);
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: scale(1, 1);
  }
}

@keyframes letter-hover {
  0% {
    transform: translateY(-7px);
  }

  50% {
    transform: translateY(7px) rotate(-5deg);
  }

  100% {
    transform: translateY(-7px);
  }
}

@keyframes letter-hover-reverse {
  0% {
    transform: translateY(7px);
  }

  50% {
    transform: translateY(-7px);
  }

  100% {
    transform: translateY(7px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .banner-title {
    &.-moving {
      #df, #ds,
      #ef, #es,
      #sf, #ss,
      #if, #is,
      #gf, #gs,
      #nf, #ns,
      #af, #as,
      #tf, #ts,
      #hf, #hs,
      #of, #os,
      #nf2, #ns2 {
        animation: none;
        transform: none;

        .wrap {
          opacity: 1;
          animation: none;
        }
      }
    }
  }
}

</style>
