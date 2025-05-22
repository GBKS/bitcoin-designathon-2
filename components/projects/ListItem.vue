<script setup>

const props = defineProps([
  'palette',
  'project',
  'ideas',
  'color',
  'prizeCases'
])

const hovering = ref(false)

const classObject = computed(() => {
  const c = ['project-list-item']

  if(isWinner.value) {
    c.push('-winner')
  }

  return c.join(' ')
})

const elementId = computed(() => {
  return 'project-summary-'+props.project.id
})

const name = computed(() => {
  return props.project.fields.Name
})

const description = computed(() => {
  return props.project.fields.Description
})

const shortenedDescription = computed(() => {
  let result = props.project.fields.Description

  if(result.length > 100) {
    result = result.substr(0, 98) //  <b>more</b>

    const lastIndex = result.lastIndexOf(' ')
    if(lastIndex > result.length - 10) {
      result = result.substr(0, lastIndex)
    }

    result += '...'
  }

  return result
})

const isWinner = computed(() => {
  const prizeField = props.project.fields.Prize
  return prizeField && prizeField != '' && prizeField.length > 0
})

function hover() {
  hovering.value = true
}

function unhover() {
  hovering.value = false
}

</script>

<template>
  <div
    :id="elementId"
    :class="classObject" 
    role="button"
    @mouseenter="hover" 
    @mouseleave="unhover"
  >
    <BoxSideDepth
      :color="color"
      :hovering="hovering"
    />
    <ProjectsListItemPrizeRibbon
      v-if="isWinner"
      :project="project"
      :palette="palette"
      :color="color"
      :hovering="hovering"
      :prizeCases="prizeCases"
    />
    <h3><a :href="'#project-'+project.id">{{ name }}</a></h3>
    <p v-if="description" v-html="shortenedDescription" />
    <ProjectsListItemIdeas
      :project="project"
      :ideas="ideas"
      align="center"
    />
    <SuperButton
      :link="'#project-'+project.id"
      label="More info"
      size="small"
      :color="color"
      :invert="true"
    />
  </div>
</template>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.project-list-item {
  position: relative;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 20px 40px;
  box-shadow: -8px 8px 0 rgba(black, 0.07);
  flex-grow: 1;
  transition: all 250ms animations.$ease;
  box-sizing: border-box;

  h3 {
    text-align: center;
    font-weight: 900;
    @include mixins.r('font-size', 22, 27);

    a {
      color: black;
      text-decoration: none;
      transition: all 150ms animations.$ease;

      &:hover {
        color: var(--palette-0);
        cursor: pointer;
      }
    }
  }

  p {
    margin: 10px 0 0 0;
    text-align: center;
    color: rgba(black, 0.75);
    @include mixins.r('font-size', 15, 18);

    a {
      color: black;
    }
  }

  > a {
    margin-top: 20px;
  }

  &.-winner {
    padding-top: 40px;
  }

  &:hover {
    transform: translate(-3px, 5px);
    box-shadow: -4px 4px 0 rgba(black, 0.15);
  }

  @include mixins.media-query(medium) {
    flex-basis: 40%;
  }

  @include mixins.media-query(large) {
    flex-basis: 26%;
  }
}

</style>


