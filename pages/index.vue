<script setup>
import dummyIdeas from "~/assets/ideas.json";
import dummyProjects from "~/assets/projects.json";
import dummySchedule from "~/assets/schedule.json";

const { AIRTABLE_ACCESS_TOKEN, USE_DUMMY_DATA } = useRuntimeConfig()

/*

Color palettes
- Orange: E76428
- Dark:
Background: 00353E
Type 1: 0797D4
Type 2: 82C947
Type 3: A67AC7
Type 4: FBD905
Type 5: E63D76
Type 6: EBADC2
Seal & Button label: E63D76
- Salmon
Background: FE7179
Type 1-6: Same
Text outline
Seal: E63D76
Button label: 000000
- Light
Background: F5F1E8
Type 1: 4A8799
Type 2: 80A850
Type 3: F2C43A
Type 4: DC6658
Seal & Button label: 488192
- Pink:
Background: E88BCA

*/
const palettes = [
  {
    name: 'Orange',
    background: '#E76428',
    seal: '#E76428',
    button: { background: null, label: '#E76428' },
    bodyText: '#FFFFFF',
    type: ['#FFFFFF'],
    typeGradient: ['#E76428'],
    typeOutline: false,
    typeOutlineWidth: null,
    typeShadowOpacity: 0.25,
    theme: null
  },
  {
    name: 'Pink',
    background: '#E88BCA',
    seal: '#E88BCA',
    button: { background: null, label: '#E88BCA' },
    bodyText: '#FFFFFF',
    type: ['#FFFFFF'],
    typeGradient: ['#E76428'],
    typeOutline: false,
    typeOutlineWidth: null,
    typeShadowOpacity: 0.25,
    theme: null
  },{
    name: 'Dark',
    background: '#00353E',
    seal: '#E63D76',
    button: { background: null, label: '#E63D76' },
    bodyText: '#FFFFFF',
    type: ['#0797D4', '#82C947', '#A67AC7', '#FBD905', '#E63D76', '#EBADC2'],
    typeGradient: ['#0797D4', '#82C947', '#A67AC7', '#FBD905', '#E63D76', '#EBADC2'],
    typeOutline: false,
    typeOutlineWidth: null,
    typeShadowOpacity: 0.25,
    theme: 'dark'
  },{
    name: 'Salmon',
    background: '#FE7179',
    seal: '#E63D76',
    button: { background: null, label: '#000000' },
    bodyText: '#000000',
    type: ['#0797D4', '#82C947', '#A67AC7', '#FBD905', '#E63D76', '#EBADC2'],
    typeGradient: ['#0797D4', '#82C947', '#A67AC7', '#FBD905', '#E63D76', '#EBADC2'],
    typeOutline: true,
    typeOutlineWidth: 2,
    typeShadowOpacity: 1,
    theme: null
  },{
    name: 'Light',
    background: '#F5F1E8',
    seal: '#488192',
    button: { background: null, label: '#488192' },
    bodyText: '#4F8C9F',
    type: ['#4A8799', '#80A850', '#F2C43A', '#DC6658'],
    typeGradient: ['#4A8799', '#80A850', '#F2C43A', '#DC6658'],
    typeOutline: true,
    typeOutlineWidth: 5,
    typeShadowOpacity: 0.25,
    theme: null
  }
]

const highContrastPalette = {
  name: 'Light',
  background: '#F5F1E8',
  seal: '#488192',
  button: { background: null, label: '#488192' },
  bodyText: '#000000',
  type: ['#4A8799', '#80A850', '#F2C43A', '#DC6658'],
  typeGradient: ['#4A8799', '#80A850', '#F2C43A', '#DC6658'],
  typeOutline: true,
  typeOutlineWidth: 5,
  typeShadowOpacity: 0.25,
  theme: null
}

const paletteIndex = ref(0)
const palette = ref(palettes[0])
const hoveredLetter = ref(null)
let isMounted = false

let windowSize, isMobile
let prefersHighContrast = false

if(process.browser) {
  windowSize = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  isMobile = window.innerWidth < 640

  prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches
}

const { data: dynamicData } = await useAsyncData(
  'airtable',
  async () => {
    if (USE_DUMMY_DATA === 'true') {
      return {
        ideas: dummyIdeas,
        projects: dummyProjects,
        schedule: dummySchedule,
      };
    } else {
      const baseUrl = 'https://api.airtable.com/v0/appAR943q3FpYsoDk/';
      const options = {
        headers: {
          Authorization: 'Bearer ' + AIRTABLE_ACCESS_TOKEN,
        },
      };

      const ideasUrl = baseUrl + 'Ideas';
      const projectsUrl = baseUrl + 'Projects';
      const scheduleUrl = baseUrl + 'Schedule';

      try {
        const [ideasResponse, projectsResponse, scheduleResponse] = await Promise.all([
          fetch(ideasUrl, options),
          fetch(projectsUrl, options),
          fetch(scheduleUrl, options),
        ]);

        if (!ideasResponse.ok || !projectsResponse.ok || !scheduleResponse.ok) {
          throw new Error('Failed to fetch data from Airtable');
        }

        const [ideas, projects, schedule] = await Promise.all([
          ideasResponse.json(),
          projectsResponse.json(),
          scheduleResponse.json(),
        ]);

        return {
          ideas: ideas.records,
          projects: projects.records,
          schedule: schedule.records,
        };
      } catch (error) {
        console.error('Error fetching data:', error);
        return {
          ideas: [],
          projects: [],
          schedule: [],
        };
      }
    }
  }
);

const ideas = computed(() => dynamicData.value?.ideas || []);
const projects = computed(() => dynamicData.value?.projects || []);
const schedule = computed(() => dynamicData.value?.schedule || []);

onMounted(() => {
  window.addEventListener('resize', onResize)

  isMounted = true

  paletteIndex.value = Math.floor(Math.random()*palettes.length)
  palette.value = palettes[paletteIndex.value]

  const adjustedIndex = paletteIndex.value
  document.querySelector('body').classList.add('-palette-'+adjustedIndex)

  updateHighContrast()

  // console.log('ideas', ideas.value)
  // console.log('projects', projects.value)
  // console.log('schedule', schedule.value)
})

const classObject = computed(() => {
  const c = ['home']

  // Dark theme
  if(palette.value.theme) {
    c.push('-'+palette.value.theme)
  }

  c.push('-palette-'+paletteIndex.value)

  // console.log('classObject', this.paletteIndex)
  // console.log('palette', this.palette)
  // console.log('c', c)

  return c.join(' ')
})

const styleObject = computed(() => {
  const s = {}

  if(isMounted && process.browser && palette.value.background) {
    s.backgroundColor = palette.value.background
  }

  // console.log('styleObject', this.paletteIndex)
  // console.log('palette', this.palette)
  // console.log('s', s, JSON.stringify(s))

  return s
})


function hoverBannerLetter(letter) {
  if(prefersHighContrast) return

  hoveredLetter.value = letter

  document.querySelector('body').classList.remove('-palette-'+paletteIndex.value)

  const adjustedIndex = letter % palettes.length
  document.querySelector('body').classList.add('-palette-'+adjustedIndex)

  paletteIndex.value = letter%palettes.length
  palette.value = palettes[paletteIndex.value]
}

function unhoverBannerLetter(letter) {
  if(prefersHighContrast) return

  if(hoveredLetter.value == letter) {
    hoveredLetter.value = null
  }
}

function updateHighContrast() {
  if(process.browser) {
    prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches

    if(prefersHighContrast) {
      palette.value = highContrastPalette
      paletteIndex.value = palettes.length

      document.querySelector('body').classList.remove('-palette-'+paletteIndex.value)
      document.querySelector('body').classList.add('-palette-'+paletteIndex.value)
    }
  }
}

function onResize() {
  if(process.browser) {
    windowSize = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    isMobile = window.innerWidth < 640
  }
}
</script>

<template>
  <div :class="classObject" :style="styleObject">
    <Banner
      :isMobile="isMobile"
      :palette="palette"
      @hoverLetter="hoverBannerLetter"
      @unhoverLetter="unhoverBannerLetter"
    />
    <InfoSection 
      :palette="palette"
    />
    <ProjectsSection
      v-if="false"
      :palette="palette"
      :ideas="ideas"
      :projects="projects"
    />
    <PrizesSection 
      v-if="false"
      :palette="palette"
    />
    <IdeasSection
      :palette="palette"
      :ideas="ideas"
      :projects="projects"
    />
    <ScheduleSection
      :schedule="schedule"
      :palette="palette"
    />
    <PartnersSection
      :palette="palette"
    />
    <QuestionsSection
      :palette="palette"
    />
    <Footer 
      :palette="palette"
    />
  </div>
</template>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.home {
  transition: background-color 350ms animations.$ease;
}

</style>
