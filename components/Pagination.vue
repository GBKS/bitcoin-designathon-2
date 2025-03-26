<template>
  <div class="pagination">
    <SuperIconButton
      icon="left"
      :disabled="index == 0"
      :color="color"
      size="small"
      @click="left"
    />
    <p v-if="false">{{ copy }}</p>
    <div class="bar" :style="barStyle">
      <div
        v-for="(dot, index) in dots"
        :key="index"
        class="dot"
        :style="dot"
      />
    </div>
    <SuperIconButton
      icon="right"
      :disabled="index >= (pages - 1)"
      :color="color"
      size="small"
      @click="right"
    />
  </div>
</template>

<script>
export default {

  props: [
    'index',
    'pages',
    'color'
  ],

  data() {
    return {

    }
  },

  computed: {
    copy() {
      return (this.index + 1) + ' of ' + this.pages
    },

    barStyle() {
      return {
        width: Math.min(50, this.pages * 10) + 'px'
      }
    },

    dots() {
      const result = []

      let size
      for(let i=0; i<this.pages; i++) {
        size = i == this.index ? 7 : 3
        result.push({
          left: 100 / (this.pages - 1) * i + '%',
          width: size + 'px',
          height: size + 'px',
          backgroundColor: this.color
        })
      }

      return result
    }
  },

  methods: {
    left() {
      this.$emit('paginate', this.index-1)
    },

    right() {
      this.$emit('paginate', this.index+1)
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.pagination {
  display: flex;
  align-items: center;
  gap: 30px;

  .bar {
    position: relative;
    width: 50px;
    height: 5px;

    .dot {
      position: absolute;
      top: 50%;
      background-color: black;
      border-radius: 100px;
      transition: all 150ms animations.$ease;
      transform: translate(-50%, -50%);
      border: 1px solid var(--front);
    }
  }
}

</style>

