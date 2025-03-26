<template>
  <div :class="classObject">
    <svg width="22" height="33" viewBox="0 0 22 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 31V2C21 1.44772 20.5523 1 20 1H2.48711C1.66545 1 1.19443 1.93598 1.68402 2.59585L11.5579 15.9042C11.8205 16.258 11.8205 16.742 11.5579 17.0958L1.68402 30.4042C1.19443 31.064 1.66545 32 2.48711 32H20C20.5523 32 21 31.5523 21 31Z" :fill="color" stroke="black" stroke-linejoin="round" :style="styleObject" />
    </svg>
    <p>{{ label }}</p>
    <svg width="22" height="33" viewBox="0 0 22 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 31V2C1 1.44772 1.44772 1 2 1H19.5129C20.3345 1 20.8056 1.93598 20.316 2.59585L10.4421 15.9042C10.1795 16.258 10.1795 16.742 10.4421 17.0958L20.316 30.4042C20.8056 31.064 20.3345 32 19.5129 32H2C1.44772 32 1 31.5523 1 31Z" :fill="color" stroke="black" stroke-linejoin="round" :style="styleObject" />
    </svg>
  </div>
</template>

<script>
export default {

  props: [
    'project',
    'palette',
    'color',
    'hovering'
  ],

  computed: {
    classObject() {
      const c = ['project-list-item-prize-ribbon']

      if(this.hovering) {
        c.push('-hover')
      }

      return c.join(' ')
    },

    label() {
      let result

      switch(this.project.fields.Prize) {
        case '1':
          result = '1st Prize';
          break;
        case '2':
          result = '2nd Prize';
          break;
        case '3':
          result = '3rd Prize';
          break;
        case '4':
          result = '4th Prize';
          break;
        case '5':
          result = '5th Prize';
          break;
      }

      return result
    },

    styleObject() {
      const s = {}

      if(this.color) {
        s.fill = this.color
      }

      return s
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.project-list-item-prize-ribbon {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    margin: 0;
    padding: 0 15px;
    line-height: 39px;
    background-color: var(--palette-2);
    border: 1px solid black;
    border-radius: 2px;
    transition: all 450ms animations.$ease;
    position: relative;
    font-weight: 600;
    font-size: 21px;
    z-index: 1;
    white-space: nowrap;
  }

  svg {
    &:nth-of-type(1) {
      transform: translateX(2px);
    }

    &:nth-of-type(2) {
      transform: translateX(-2px);
    }
  }

  &.-hover {
    p {
      padding-left: 25px;
      padding-right: 25px;
    }
  }
}

</style>


