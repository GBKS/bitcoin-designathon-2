<script setup>

const props = defineProps([
  'palette',
  'projects',
  'ideas',
  'color'
])

const activeId = ref(null)
const paginationIndex = ref(0)
const perPage = 9

const prizeCases = {
  '1': '1st Prize',
  '2': '2nd Prize',
  '3': '3rd Prize',
  '4': '4th Prize',
  '5': '5th Prize',
  '6': '6th Prize',
  'ecash': 'Ecash Notes Prize',
  'ecash-1': 'Ecash Notes 1st Prize',
  'ecash-2': 'Ecash Notes 2nd Prize',
  'ecash-3': 'Ecash Notes 3rd Prize',
  'ecash-c': 'Ecash Notes Crowd Fave',
  'accessibility': 'Accessibility Price',
  'open-design': 'Open Design Price'
}

onMounted(() => {
  // On load, check if deep-linking to a project
  // If so, show overlay and scroll to projects section
  // Hash is not available during build, so doing this here
  if(process.browser) {
    window.addEventListener('hashchange', checkHash)

    checkHash(true)
  }
})

const paginationPages = computed(() => {
  let result = 0

  if(props.projects && props.projects.length > 0) {
    result = Math.ceil(props.projects.length / perPage)
  }

  return result
})

const filteredProjects = computed(() => {
  let result = props.projects

  const prizeCaseKeys = Object.keys(prizeCases)

  // Sort by prize
  result = result.sort((a, b) => {
    const aPrize = a.fields.Prize ? a.fields.Prize.split(',')[0] : null
    const bPrize = b.fields.Prize ? b.fields.Prize.split(',')[0] : null
    
    const aPrizeIndex = aPrize ? prizeCaseKeys.indexOf(aPrize) : 100
    const bPrizeIndex = bPrize ? prizeCaseKeys.indexOf(bPrize) : 100

    return aPrizeIndex - bPrizeIndex
  })

  // Filter by pagination
  if(paginationPages.value > 1) {
    const start = paginationIndex.value * perPage
    result = result.slice(start, start + perPage)
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

  // Looks like #project-recd90OXCtbtOaMb5
  const fullHash = window.location.hash

  if(fullHash && fullHash.indexOf('-') !== -1) {
    let hash = fullHash.split('-')[1]

    for(let i=0; i<props.projects.length; i++) {
      if(props.projects[i].id == hash) {
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

  activeId.value = newActiveId
}

</script>

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
      <client-only>
        <ProjectsListItem
          v-for="item in filteredProjects"
          :key="item.id"
          :palette="palette"
          :project="item"
          :ideas="ideas"
          :color="color"
          :prizeCases="prizeCases"
        />
      </client-only>
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

