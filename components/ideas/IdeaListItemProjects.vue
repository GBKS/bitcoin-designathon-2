<template>
  <div v-if="projectList" :class="classObject">
    <h5>Projects based on this idea</h5>
    <a
      v-for="project in projectList"
      :key="project.id"
      :href="'#project-'+project.id"
    >{{ project.fields.Name }}</a>
  </div>
</template>

<script>
export default {

  props: [
    'idea',
    'projects',
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

    projectList() {
      let result = []

      const ideaProjects = this.idea.fields.Projects

      if(ideaProjects) {
        let projectId, project, i, k
        for(i=0; i<ideaProjects.length; i++) {
          projectId = ideaProjects[i]

          for(k=0; k<this.projects.length; k++) {
            project = this.projects[k]

            if(project.id == projectId) {
              result.push(project)
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
    font-weight: 600;
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


