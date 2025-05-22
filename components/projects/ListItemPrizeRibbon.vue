<template>
  <div :class="classObject">
    <div class="wrap">
      <p v-html="label" />
      <div
        v-for="(dot, index) in dots"
        :key="index"
        class="dot"
        :style="dot.style"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: { type: Object, required: true },
  palette: { type: Object, required: false },
  color: { type: String, required: false },
  hovering: { type: Boolean, required: false },
  prizeCases: { type: Object, required: true }
})

const dots = ref([])

const createDots = () => {
  let dot, side, left, top, size
  while(dots.value.length < 5) {
    side = Math.floor(Math.random() * 4) + 1

    switch(side) {
      case 1: // Top
        left = Math.floor(Math.random() * 80) + 10
        top = Math.floor(Math.random() * 20) - 15
        break
      case 2: // Bottom
        left = Math.floor(Math.random() * 80) + 10
        top = Math.floor(Math.random() * 20) + 95
        break
      case 3: // Left
        left = Math.floor(Math.random() * 6) - 3
        top = Math.floor(Math.random() * 90) + 5
        break
      case 4: // Right
        left = Math.floor(Math.random() * 6) + 97
        top = Math.floor(Math.random() * 90) + 5
        break
    }

    size = Math.floor(Math.random() * 15) + 6

    dot = {
      style: {
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`
      }
    }
    dots.value.push(dot)
  }
}

createDots()

const classObject = computed(() => {
  const c = ['project-list-item-prize-ribbon']
  if (props.hovering) {
    c.push('-hover')
  }
  return c.join(' ')
})

const label = computed(() => {
  const bits = []
  const prizeBits = props.project?.fields?.Prize?.split(',')
  if (prizeBits) {
    for (const bit of prizeBits) {
      if (props.prizeCases[bit]) {
        bits.push(props.prizeCases[bit])
      }
    }
  }
  return bits.join('<br/>')
})

const styleObject = computed(() => {
  const s = {}
  if (props.color) {
    s.fill = props.color
  }
  return s
})
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

  .wrap {
    position: relative;

    .dot {
      position: absolute;
      border-radius: 100px;
      background-color: var(--palette-0);
      border: 1px solid black;
      z-index: 2;
      transform: translate(-50%, -50%);
      animation: pointScale 3s ease-in-out infinite;

      &:nth-of-type(1) {
        animation-delay: 0.2s;
        animation-duration: 3.5s;
      }
      &:nth-of-type(2) {
        animation-delay: 0.4s;
        animation-duration: 3.2s;
        background-color: var(--palette-1);
      }
      &:nth-of-type(3) {
        animation-delay: 0.6s;
        animation-duration: 3.4s;
        background-color: var(--palette-2);
      }
      &:nth-of-type(4) {
        animation-delay: 0.8s;
        animation-duration: 3.1s;
      }
      &:nth-of-type(5) {
        animation-delay: 1s;
        animation-duration: 3.3s;
        background-color: var(--palette-1);
      }
    }
  }

  p {
    margin: 0;
    padding: 5px 10px;
    background-color: var(--palette-2);
    border: 1px solid black;
    border-radius: 15px;
    transition: all 450ms animations.$ease;
    position: relative;
    font-weight: 600;
    font-size: 17px;
    line-height: 1.2;
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

@keyframes pointScale {
  0% {
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    transform: translate(-50%, -50%) scale(0.75);
  }
  100% {
    transform:translate(-50%, -50%) scale(1);
  }
}
</style>


