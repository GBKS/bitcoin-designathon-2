<template>
  <component
    :is="componentType"
    :class="classObject"
    :style="styleObject"
    :href="link"
    :target="target"
    :disabled="disabled"
    @click="click"
  >
    <svg v-if="icon == 'nostr'" width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.4252 9.9091V21.4419C22.4252 21.8756 22.0733 22.2275 21.6396 22.2275H12.2116C11.7779 22.2275 11.4259 21.8756 11.4259 21.4419V19.2941C11.4689 16.6614 11.7474 14.1395 12.3322 12.9922C12.6827 12.3021 13.2605 11.9266 13.9243 11.7257C15.1783 11.3488 17.3787 11.6065 18.3126 11.5622C18.3126 11.5622 21.1338 11.6744 21.1338 10.0768C21.1338 8.7909 19.8729 8.892 19.8729 8.892C18.4831 8.9281 17.4244 8.8338 16.7385 8.5636C15.5898 8.1119 15.551 7.2833 15.5469 7.0062C15.4901 3.8053 10.7705 3.42147 6.61224 4.21545C2.0659 5.0801 6.66214 11.5968 6.66214 20.2959V21.4571C6.65384 21.8839 6.30874 22.2289 5.87922 22.2289H1.21095C0.777243 22.2289 0.425293 21.877 0.425293 21.4433V1.4968C0.425293 1.06309 0.777243 0.711143 1.21095 0.711143H5.59931C6.03304 0.711143 6.38494 1.06309 6.38494 1.4968C6.38494 2.14113 7.10964 2.50002 7.63344 2.1245C9.21174 0.993812 11.2375 0.391052 13.5044 0.391052C18.5828 0.391052 22.4225 3.35081 22.4225 9.9091H22.4252ZM13.9949 7.5687C13.9949 6.6403 13.2425 5.88794 12.3141 5.88794C11.3858 5.88794 10.6333 6.6403 10.6333 7.5687C10.6333 8.4971 11.3858 9.2495 12.3141 9.2495C13.2425 9.2495 13.9949 8.4971 13.9949 7.5687Z" fill="currentColor"/></svg>
    <svg v-if="icon == 'left'" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8995 1L1.70709 10.1924C1.31656 10.5829 1.31656 11.2161 1.70709 11.6066L10.8995 20.799" stroke="currentcolor" stroke-width="2" stroke-linecap="round"/></svg>
    <svg v-if="icon == 'right'" width="12" height="22" viewBox="0 0 12 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.10046 1.20117L10.2929 10.3936C10.6834 10.7841 10.6834 11.4172 10.2929 11.8078L1.10047 21.0002" stroke="currentcolor" stroke-width="2" stroke-linecap="round"/></svg>
    <svg v-if="icon == 'twitter'" width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.362 3.73872C14.368 3.87972 14.372 4.02072 14.372 4.16372C14.372 8.50072 11.07 13.5027 5.032 13.5027C3.24796 13.5045 1.5011 12.9928 0 12.0287C0.257 12.0587 0.518 12.0737 0.783 12.0737C2.26119 12.0763 3.69725 11.5814 4.86 10.6687C4.17496 10.6561 3.51101 10.4297 2.96106 10.021C2.41111 9.61237 2.00271 9.04199 1.793 8.38972C2.28528 8.48315 2.79234 8.46366 3.276 8.33272C2.53313 8.18267 1.86506 7.78023 1.38513 7.19367C0.905211 6.60712 0.643002 5.87259 0.643 5.11472V5.07272C1.085 5.31872 1.592 5.46672 2.13 5.48372C1.43419 5.02004 0.941591 4.30827 0.752773 3.49371C0.563956 2.67916 0.693157 1.82325 1.114 1.10072C1.93827 2.11486 2.9666 2.94432 4.13225 3.53524C5.29789 4.12615 6.57477 4.46532 7.88 4.53072C7.71463 3.82662 7.7864 3.08762 8.08415 2.4285C8.38191 1.76938 8.88899 1.22703 9.52663 0.885691C10.1643 0.544353 10.8968 0.423132 11.6104 0.540857C12.324 0.658581 12.9788 1.00866 13.473 1.53672C14.2083 1.39228 14.9135 1.12306 15.558 0.740722C15.3127 1.50077 14.8 2.14601 14.115 2.55672C14.7655 2.47909 15.4009 2.30484 16 2.03972C15.5591 2.69875 15.0045 3.27406 14.362 3.73872V3.73872Z" fill="currentColor"/></svg>
  </component>
</template>

<script>
export default {

  props: [
    'link',
    'icon',
    'color',
    'textColor',
    'size',
    'invert',
    'disabled'
  ],

  computed: {
    classObject() {
      const c = ['super-icon-button']

      if(this.size) {
        c.push('-'+this.size)
      } else {
        c.push('-medium')
      }

      if(this.invert) {
        c.push('-invert')
      }

      if(this.disabled) {
        c.push('-disabled')
      }

      if(this.icon) {
        c.push('-'+this.icon)
      }

      return c.join(' ')
    },

    styleObject() {
      const s = {}

      if(this.color) {
        s.backgroundColor = this.color
      }

      if(this.textColor) {
        s.color = this.textColor || null
      }

      return s
    },

    componentType() {
      return this.link ? 'a' : 'button'
    },

    target() {
      return (this.link && this.link.substr(0, 1) !== '#') ? '_blank' : null
    }
  },

  methods: {
    click() {
      if(!this.disabled) {
        this.$emit('click')
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.super-icon-button {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: white;
  // border: 2px solid var(--front);
  text-decoration: none;
  border-radius: 1000px;
  font-weight: 900;
  padding: 0;
  color: var(--front);
  text-align: center;
  width: 62px;
  height: 62px;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 150ms ease-in-out;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  @include mixins.r('font-size', 17, 22);

  svg {
    width: 25px;
    height: 25px;
  }

  &:nth-child(2) {
    padding-left: 15px;
    padding-right: 15px;
    text-align: center;

    svg {
      margin-right: 0;
    }
  }

  &.-small {
    border-width: 1px;
    width: 40px;
    height: 40px;
    padding: 0;
    @include mixins.r('font-size', 15, 17);

    svg {
      width: 20px;
      height: 20px;
    }

    &:before {
      left: -7px;
      top: -7px;
      width: calc(100% + 12px);
      height: calc(100% + 12px);
      border-width: 1px;
    }
  }

  &.-invert {
    border-color: black;

    &:before {
      border-color: rgba(black, 0.2);
    }
  }

  &.-left {
    svg {
      transform: translateX(-2px);
    }
  }

  &.-right {
    svg {
      transform: translateX(2px);
    }
  }

  &.-disabled {
    opacity: 0.25;
    cursor: default;
  }

  &:hover {
    animation: buttonHover 500ms infinite animations.$easeInOutSine alternate;

    &:before {
      left: -6px;
      top: -6px;
      width: calc(100% + 8px);
      height: calc(100% + 8px);
    }
  }

  &.-small {
    &:hover {
      &:before {
        left: -4px;
        top: -4px;
        width: calc(100% + 6px);
        height: calc(100% + 6px);
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

@media (prefers-reduced-motion: reduce) {
  .super-button {
    &:hover {
      animation: none;
    }
  }
}

</style>
