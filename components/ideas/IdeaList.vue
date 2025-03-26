<template>
  <div class="idea-list">
    <Pagination
      v-if="paginationPages > 1"
      :index="paginationIndex"
      :pages="paginationPages"
      :color="color"
      @paginate="paginate"
    />
    <div class="wrap">
      <IdeasIdeaListItem
        v-for="item in filteredIdeas"
        :key="item.id"
        :palette="palette"
        :idea="item"
        :projects="projects"
        :color="color"
      />
    </div>
    <IdeasIdeaListItemOverlay
      :activeId="activeId"
      :palette="palette"
      :ideas="ideas"
      :projects="projects"
      :color="color"
      @close="closeOverlay"
    />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'ideas',
    'projects',
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
    // On load, check if deep-linking to an idea
    // If so, show overlay and scroll to ideas section
    // Hash is not available during build, so doing this here
    if(process.browser) {
      window.addEventListener('hashchange', this.checkHash.bind(this))

      this.checkHash(true)
    }
  },

  computed: {
    paginationPages() {
      let result = 0

      if(this.ideas && this.ideas.length > 0) {
        result = Math.ceil(this.ideas.length / this.perPage)
      }

      return result
    },

    filteredIdeas() {
      let result = this.ideas

      if(this.paginationPages > 1) {
        const start = this.paginationIndex * this.perPage
        result = this.ideas.slice(start, start + this.perPage)
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

      // Looks like #idea-recd90OXCtbtOaMb5
      const fullHash = window.location.hash

      if(fullHash && fullHash.indexOf('-') !== -1) {
        let hash = fullHash.split('-')[1]

        for(let i=0; i<this.ideas.length; i++) {
          if(this.ideas[i].id == hash) {
            newActiveId = hash

            if(scrollToSection) {
              const ideaSection = document.getElementById('ideas')
              const sectionCenter = ideaSection.offsetTop + ideaSection.offsetHeight/2
              const delta = Math.abs(sectionCenter - window.pageYOffset)


              if(delta > 600) {
                window.scrollTo(0, ideaSection.offsetTop)
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

.idea-list {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;

  .wrap {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    max-width: 1340px;
  }

  @include mixins.media-query(small) {
    .wrap {
      flex-direction: column;
    }
  }
}

</style>

