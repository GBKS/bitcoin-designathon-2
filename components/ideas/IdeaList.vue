<script setup>

const props = defineProps([
  'palette',
  'ideas',
  'projects',
  'color',
  'textColor'
])

const activeId = ref(null)
const paginationIndex = ref(0)
const perPage = 9

const paginationPages = computed(() => {
  let result = 0

  if(props.ideas && props.ideas.length > 0) {
    result = Math.ceil(props.ideas.length / perPage)
  }

  return result
})

const filteredIdeas = computed(() => {
  let result = props.ideas

  if(paginationPages.value > 1) {
    const start = paginationIndex.value * perPage
    result = props.ideas.slice(start, start + perPage)
  }

  return result
})

function closeOverlay() {
  if(process.browser) {
    if(window.location.hash == '#'+activeId.value) {
      history.pushState(null, null, '');
    }
  }

  activeId.value = null
}

function paginate(page) {
  paginationIndex.value = page
}

function checkHash(scrollToSection) {
  let newActiveId

  // Looks like #idea-recd90OXCtbtOaMb5
  const fullHash = window.location.hash

  if(fullHash && fullHash.indexOf('-') !== -1) {
    let hash = fullHash.split('-')[1]

    for(let i=0; i<props.ideas.length; i++) {
      if(props.ideas[i].id == hash) {
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

  activeId.value = newActiveId
}

onMounted(() => {
  // On load, check if deep-linking to an idea
  // If so, show overlay and scroll to ideas section
  // Hash is not available during build, so doing this here
  if(process.browser) {
    window.addEventListener('hashchange', checkHash)

    checkHash(true)
  }
})
</script>

<template>
  <div class="idea-list">
    <Pagination
      v-if="paginationPages > 1"
      :index="paginationIndex"
      :pages="paginationPages"
      :color="color"
      :textColor="textColor"
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
        :textColor="textColor"
      />
    </div>
    <IdeasIdeaListItemOverlay
      :activeId="activeId"
      :palette="palette"
      :ideas="ideas"
      :projects="projects"
      :color="color"
      :textColor="textColor"
      @close="closeOverlay"
    />
  </div>
</template>

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

