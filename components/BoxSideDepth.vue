<template>
  <client-only>
  <div
    :class="classObject"
    :style="styleObject"
  >
    <div class="lines">
      <div
        v-for="(item, index) in lines"
        :key="index"
        :style="item"
      />    
    </div>
  </div>
  </client-only>
</template>

<script>
export default {

  props: [
    'color',
    'side',
    'hovering'
  ],

  data() {
    const lines = []

    while(lines.length < 3) {
      lines.push({
        top: Math.round(Math.random()*90 + 5) + '%'
      })
    }

    return {
      lines
    }
  },

  watch: {
    hovering() {
      this.updateLines()
    }
  },

  computed: {
    classObject() {
      const c = ['box-side-depth']

      if(this.side) {
        c.push('-'+this.side)
      } else {
        c.push('-left')
      }

      if(this.hovering) {
        c.push('-hover')
      }

      return c.join(' ')
    },

    styleObject() {
      const s = {}

      if(this.color) {
        s.backgroundColor = this.color
      }

      return s
    }
  },

  methods: {
    updateLines() {
      for(let i=0; i<this.lines.length; i++) {
        this.lines[i].top = Math.round(Math.random()*90 + 5) + '%'
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.box-side-depth {
  position: absolute;
  top: 0;
  width: 20px;
  height: 100%;

  .lines {
    position: relative;
    height: 100%;

    > div {
      position: absolute;
      left: 0;
      right: 0;
      border-top: 1px solid black;
      transition: top 1250ms animations.$ease; 
    }
  }

  &.-left {
    left: 0;
    border-right: 1px solid black;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
  }

  &.-right {
    right: 0;
    border-left: 1px solid black;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
  }
}

</style>
