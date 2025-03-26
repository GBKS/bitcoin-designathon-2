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

<script>
export default {

  props: [
    'project',
    'ideas',
    'align'
  ],

  data() {
    return {
      hovering: false
    }
  },

  computed: {
    classObject() {
      const c = []

      if(this.align) {
        c.push('-'+this.align)
      } else {
        c.push('-left')
      }

      return c.join(' ')
    },

    title() {
      let result

      if(this.ideaList) {
        if(this.ideaList.length == 1) {
          return 'Based on this idea'
        } else {
          return 'Based on these ideas'
        }
      }

      return result
    },

    ideaList() {
      let result = []

      const projectIdeas = this.project.fields.Idea
      if(projectIdeas) {
        let ideaId, idea, i, k
        for(i=0; i<projectIdeas.length; i++) {
          ideaId = projectIdeas[i]

          for(k=0; k<this.ideas.length; k++) {
            idea = this.ideas[k]

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
    }
  }

}
</script>

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


