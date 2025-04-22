<script setup>
import allCopy from "~/assets/copy.json";

const props = defineProps([
  'palette',
  'projects',
  'ideas'
])

const copy = allCopy.projects
const shuffleProjects = ref(false)

onMounted(() => {
  shuffleProjects.value = true
})

const cleanProjects = computed(() => {
  const result = []

  let project
  for(let i=0; i<props.projects.length; i++) {
    project = props.projects[i]

    if(project.fields.Name && 
      project.fields.Name.length > 0 && 
      project.fields.Description && 
      project.fields.Description.length > 0 && 
      project.fields.Status == 'Visible'
    ) {
      result.push(project)
    }
  }

  if(shuffleProjects.value) {
    const shuffledResult = shuffle(result)
    const resultWithWinnersAtFront = moveWinnersToFront(shuffledResult)
    return resultWithWinnersAtFront
  } else {
    return result
  }
})

const color = computed(() => {
  return props.palette[2]
})

function shuffle(a) {
  let j, x, i
  for(i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
  return a
}

function moveWinnersToFront(list) {
  return list.sort(function(a, b) {
    const aPrize = a.fields.Prize
    const bPrize = b.fields.Prize
    if(aPrize && bPrize) {
      return parseInt(aPrize) < parseInt(bPrize) ? -1 : 1
    } else if(aPrize) {
      return -1
    } else if(bPrize) {
      return 1
    } else {
      return 0
    }
  })
}
</script>

<template>
  <div id="projects" class="projects-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :link="copy.link"
      :linkLabel="copy.linkLabel"
      :color="palette.button.background"
      :textColor="palette.button.label"
    />
    <ProjectsList
      v-if="false && projects"
      :projects="cleanProjects"
      :ideas="ideas"
      :palette="palette"
      :color="color"
    />

    <div class="registration" v-if="false">
      <p v-html="copy.general.text" />
      <SuperButton
        :link="copy.general.link"
        label="Add a project"
        :color="palette.button.background"
        :textColor="palette.button.label"
      />
    </div>
  </div>
</template>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.projects-section {
  .registration {
    margin-top: 20px;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    
    p {
      text-align: center;
      @include mixins.r('font-size', 18, 20);
    }

    .super-button {
      padding-left: 25px;
      padding-right: 25px;
      flex-shrink: 1;
    }
  }
}

</style>


