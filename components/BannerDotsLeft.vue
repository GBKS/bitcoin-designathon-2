<template>
  <div :class="classObject">
    <svg width="203" height="231" viewBox="0 0 203 231" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="ts" @click="clickLetter('1')" @mouseenter="hoverLetter('1')" @mouseleave="unhoverLetter('1')" style="transform-origin: 13.8% 61%;">
        <g class="wrap">
          <path 
            d="M42.1833 116.637C59.9529 126.381 62.1013 151.257 46.0764 163.664C35.3702 171.952 20.189 171.361 10.0693 162.365C-3.91908 149.931 -2.21563 127.426 13.6223 117.454C22.2571 112.017 33.2365 111.73 42.1833 116.637Z"
            :fill="colors[0]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M42.1833 116.637C59.9529 126.381 62.1013 151.257 46.0764 163.664C35.3702 171.952 20.189 171.361 10.0693 162.365C-3.91908 149.931 -2.21563 127.426 13.6223 117.454C22.2571 112.017 33.2365 111.73 42.1833 116.637Z"
            fill="url(#paint0_linear_145_8677)"
          />
        </g>
      </g>
      <g id="as" @click="clickLetter('2')" @mouseenter="hoverLetter('2')" @mouseleave="unhoverLetter('2')" style="transform-origin: 82.3% 87.9%;">
        <g class="wrap"><
          <path 
            d="M157.858 180.921L160.268 182.392C166.23 186.032 173.987 184.493 178.107 178.853C185.992 168.062 203.083 174.159 202.358 187.504L201.399 205.153C201.027 212.009 196.922 218.107 190.711 221.032L176.28 227.828C166.47 232.448 154.944 231.514 146.006 225.375L142.292 222.825C136.33 218.73 132.767 211.961 132.767 204.728V195.001C132.767 182.122 146.866 174.21 157.858 180.921Z"
            :fill="colors[2]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M157.858 180.921L160.268 182.392C166.23 186.032 173.987 184.493 178.107 178.853C185.992 168.062 203.083 174.159 202.358 187.504L201.399 205.153C201.027 212.009 196.922 218.107 190.711 221.032L176.28 227.828C166.47 232.448 154.944 231.514 146.006 225.375L142.292 222.825C136.33 218.73 132.767 211.961 132.767 204.728V195.001C132.767 182.122 146.866 174.21 157.858 180.921Z"
            fill="url(#paint1_linear_145_8677)"
          />
        </g>
      </g>
      <g id="ns" @click="clickLetter('3')" @mouseenter="hoverLetter('3')" @mouseleave="unhoverLetter('3')" style="transform-origin: 55.7% 14.3%;">
        <g class="wrap">
          <path 
            d="M89.0615 24.9366L91.5913 22.8647C94.3516 20.6041 96.5915 17.7629 98.1487 14.5528C105.064 0.297256 123.269 -3.81654 136.308 5.18569C138.75 6.8721 140.872 8.25861 142.408 9.13062C144.436 10.281 146.045 13.4184 147.307 17.5358C152.678 35.0509 139.463 51.9764 122.064 57.709L109.359 61.8945C101.137 64.6034 92.0924 62.1029 86.4294 55.5552C78.5343 46.4268 79.7243 32.5837 89.0615 24.9366Z"
             :fill="colors[3]" :stroke="strokeStyle" :stroke-width="strokeWidthStyle"
          />
          <path 
            d="M89.0615 24.9366L91.5913 22.8647C94.3516 20.6041 96.5915 17.7629 98.1487 14.5528C105.064 0.297256 123.269 -3.81654 136.308 5.18569C138.75 6.8721 140.872 8.25861 142.408 9.13062C144.436 10.281 146.045 13.4184 147.307 17.5358C152.678 35.0509 139.463 51.9764 122.064 57.709L109.359 61.8945C101.137 64.6034 92.0924 62.1029 86.4294 55.5552C78.5343 46.4268 79.7243 32.5837 89.0615 24.9366Z"
            fill="url(#paint2_linear_145_8677)"
          />
        </g>
      </g>
      <defs>
        <linearGradient id="paint0_linear_145_8677" x1="111.697" y1="-13.1885" x2="111.697" y2="66.3679" gradientUnits="userSpaceOnUse">
          <stop :stop-color="gradientColors[0]" stop-opacity="0"/>
          <stop offset="1" :stop-color="gradientColors[0]" stop-opacity="0.25"/>
        </linearGradient>
        <linearGradient id="paint1_linear_145_8677" x1="111.697" y1="-13.1885" x2="111.697" y2="66.3679" gradientUnits="userSpaceOnUse">
          <stop :stop-color="gradientColors[1]" stop-opacity="0"/>
          <stop offset="1" :stop-color="gradientColors[1]" stop-opacity="0.25"/>
        </linearGradient>
        <linearGradient id="paint2_linear_145_8677" x1="111.697" y1="-13.1885" x2="111.697" y2="66.3679" gradientUnits="userSpaceOnUse">
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
        'banner-dots-left'
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

.banner-dots-left {
  // position: absolute;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 0.879;
  container-type: size;
  container-name: aspect-container;
  height: 44.2%;
  // box-sizing: border-box;
  // padding-left: 30px;

  svg {
    overflow: visible;
    width: 100%;
    height: auto;
  }

  @container aspect-container (aspect-ratio <= 2.0765) {
    svg {
      // width: 100%;
      // height: auto;
    }
  }

  @include mixins.media-query(small) {
    justify-content: center;

    svg {
      width: 20vw;
      transform: translateY(-32vw);
    }
  }

  @include mixins.media-query(medium-up) {
    width: auto;
    height: 44.2%;
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
