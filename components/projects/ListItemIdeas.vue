<script setup>

const props = defineProps([
  'project',
  'ideas',
  'align'
])

const hovering = ref(false)

const classObject = computed(() => {
  const c = []

  if(props.align) {
    c.push('-'+props.align)
  } else {
    c.push('-left')
  }

  return c.join(' ')
})

const title = computed(() => {
  let result

  if(ideaList.value) {
    if(ideaList.value.length == 1) {
      return 'Based on this idea'
    } else {
      return 'Based on these ideas'
    }
  }

  return result
})

const ideaList = computed(() => {
  let result = []

  const projectIdeas = props.project.fields.Idea
  if(projectIdeas) {
    let ideaId, idea, i, k
    for(i=0; i<projectIdeas.length; i++) {
      ideaId = projectIdeas[i]

      for(k=0; k<props.ideas.length; k++) {
        idea = props.ideas[k]

        if(idea.id == ideaId) {
          result.push(idea)
          break
        }
      }
    }
  }

  if(result.length == 0) {
    result = null
  }

  return result
})

</script>

<template>
  <div v-if="ideaList" :class="classObject">
    <h5>{{ title }}</h5>
    <a
      v-for="idea in ideaList"
      :key="idea.id"
      :href="'#idea-'+idea.id"
    >{{ idea.fields.Name }}</a>
  </div>
</template>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

div {
  margin-top: 20px;

  h5 {
    font-weight: 900;
    color: black;
    @include mixins.r('font-size', 15, 18);

    & + a {
      margin-top: 5px;
    }
  }

  a {
    display: block;
    color: rgba(black, 0.75);
    @include mixins.r('font-size', 15, 18);
  }

  &.-center {
    text-align: center;

    a {
      text-align: center;
    }
  }
}

</style>


