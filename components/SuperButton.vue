<template>
  <component
    :is="componentType"
    :class="classObject"
    :style="styleObject"
    :href="link"
    :target="target"
    @click="click"
  >{{ label }}</component>
</template>

<script>
export default {

  props: [
    'link',
    'label',
    'color',
    'textColor',
    'size',
    'invert'
  ],

  computed: {
    classObject() {
      const c = ['super-button']

      if(this.size) {
        c.push('-'+this.size)
      } else {
        c.push('-medium')
      }

      if(this.invert) {
        c.push('-invert')
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
      this.$emit('click')
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.super-button {
  display: inline-block;
  position: relative;
  background-color: white;
  // border: 2px solid var(--front);
  text-decoration: none;
  border-radius: 1000px;
  font-weight: 900;
  padding: 6px 50px 7px 50px;
  color: var(--front);
  text-align: center;
  font-family: 'Sniglet';
  font-weight: 900;
  box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  @include mixins.r('font-size', 17, 35);

  svg {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    vertical-align: middle;
    transform: translateY(-2px);
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
    @include mixins.r('font-size', 15, 35);

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
