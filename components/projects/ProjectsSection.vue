<template>
  <div id="projects" class="projects-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :link="copy.link"
      :linkLabel="copy.linkLabel"
      :color="color"
    />
    <ProjectsList
      v-if="projects"
      :projects="cleanProjects"
      :ideas="ideas"
      :palette="palette"
      :color="color"
    />

    <div class="registration" v-if="false">
      <p v-html="copy.general.text" />
      <SuperButton
        :link="copy.general.link"
        label="Register"
        size="small"
        :color="color"
      />
    </div>
  </div>
</template>

<script>
import copy from "~/assets/copy.json";

export default {

  props: [
    'palette',
    'projects',
    'ideas'
  ],

  data() {
    return {
      copy: copy.projects,
      shuffleProjects: false
    }
  },

  mounted() {
    this.shuffleProjects = true
  },

  computed: {
    cleanProjects() {
      const result = []

      let project
      for(let i=0; i<this.projects.length; i++) {
        project = this.projects[i]

        if(project.fields.Name && 
          project.fields.Name.length > 0 && 
          project.fields.Description && 
          project.fields.Description.length > 0 && 
          project.fields.Status == 'Visible'
        ) {
          result.push(project)
        }
      }

      if(this.shuffleProjects) {
        const shuffledResult = this.shuffle(result)
        const resultWithWinnersAtFront = this.moveWinnersToFront(shuffledResult)
        return resultWithWinnersAtFront
      } else {
        return result
      }
    },

    color() {
      return this.palette[2]
    }
  },

  methods: {
    shuffle(a) {
      let j, x, i
      for(i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        x = a[i]
        a[i] = a[j]
        a[j] = x
      }
      return a
    },

    moveWinnersToFront(list) {
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
  }

}
</script>

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
      flex-shrink: 1;
    }
  }
}

</style>


