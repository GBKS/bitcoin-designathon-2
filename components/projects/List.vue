<template>
  <div class="project-list">
    <Pagination
      v-if="paginationPages > 1"
      :index="paginationIndex"
      :pages="paginationPages"
      :color="color"
      @paginate="paginate"
    />
    <div class="wrap">
      <ProjectsListItem
        v-for="item in filteredProjects"
        :key="item.id"
        :palette="palette"
        :project="item"
        :ideas="ideas"
        :color="color"
      />
    </div>
    <ProjectsListItemOverlay
      :activeId="activeId"
      :palette="palette"
      :projects="projects"
      :ideas="ideas"
      :color="color"
      @close="closeOverlay"
    />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'projects',
    'ideas',
    'color'
  ],

  data() {
    return {
      activeId: null,
      paginationIndex: 0,
      perPage: 9
    }
  },

  mounted() {
    // On load, check if deep-linking to a project
    // If so, show overlay and scroll to projects section
    // Hash is not available during build, so doing this here
    if(process.browser) {
      window.addEventListener('hashchange', this.checkHash.bind(this))

      this.checkHash(true)
    }
  },

  computed: {
    paginationPages() {
      let result = 0

      if(this.projects && this.projects.length > 0) {
        result = Math.ceil(this.projects.length / this.perPage)
      }

      return result
    },

    filteredProjects() {
      let result = this.projects

      if(this.paginationPages > 1) {
        const start = this.paginationIndex * this.perPage
        result = this.projects.slice(start, start + this.perPage)
      }

      return result
    }
  },

  methods: {
    closeOverlay() {
      if(process.browser) {
        if(window.location.hash == '#'+this.activeId) {
          history.pushState(null, null, '');
        }
      }

      this.activeId = null
    },

    paginate(page) {
      this.paginationIndex = page
    },

    checkHash(scrollToSection) {
      let newActiveId

      // Looks like #project-recd90OXCtbtOaMb5
      const fullHash = window.location.hash

      if(fullHash && fullHash.indexOf('-') !== -1) {
        let hash = fullHash.split('-')[1]

        for(let i=0; i<this.projects.length; i++) {
          if(this.projects[i].id == hash) {
            newActiveId = hash

            if(scrollToSection) {
              const projectSection = document.getElementById('projects')
              const sectionCenter = projectSection.offsetTop + projectSection.offsetHeight/2
              const delta = Math.abs(sectionCenter - window.pageYOffset)


              if(delta > 600) {
                window.scrollTo(0, projectSection.offsetTop)
              }
            }

            break;
          }
        }
      }

      this.activeId = newActiveId
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.project-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .wrap {
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    row-gap: 50px;
    max-width: 1340px;
  }

  @include mixins.media-query(small) {
    .wrap {
      flex-direction: column;
    }
  }
}

</style>

