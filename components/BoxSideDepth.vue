<script setup>

const props = defineProps([
  'text',
  'color',
  'side',
  'hovering'
])

const classObject = computed(() => {
  const c = ['box-side-depth']

  if(props.side) {
    c.push('-'+props.side)
  } else {
    c.push('-left')
  }

  if(props.hovering) {
    c.push('-hover')
  }

  return c.join(' ')
})

const styleObject = computed(() => {
  const s = {}

  if(props.color) {
    s.backgroundColor = props.color
  }

  return s
})

const shortenedText = computed(() => {
  return props.text ? props.text.substring(0, 3) : ''
})

</script>

<template>
  <client-only>
  <div
    :class="classObject"
    :style="styleObject"
  >
    <p>{{ shortenedText }}</p>
  </div>
  </client-only>
</template>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.box-side-depth {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.05;
  pointer-events: none;

  p {
    font-family: 'Sniglet', sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    font-size: 500px;
    text-align: center;
    line-height: 0.75;
    letter-spacing: -0.025em;
    color: var(--palette-1);
  }
}

</style>
