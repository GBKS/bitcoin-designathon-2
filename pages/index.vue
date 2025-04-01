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
      v-if="false"
      :palette="palette"
      :ideas="ideas"
      :projects="projects"
    />
    <ScheduleSection
      v-if="false"
      :schedule="schedule"
      :palette="palette"
    />
    <PartnersSection
      v-if="false"
      :palette="palette"
    />
    <QuestionsSection
      v-if="false"
      :palette="palette"
    />
    <Footer 
      :palette="palette"
    />
  </div>
</template>

<script>
import dummyIdeas from "~/assets/ideas.json";
import dummyProjects from "~/assets/projects.json";
import dummySchedule from "~/assets/schedule.json";

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

export default {

  data() {
    /*

    1-3 for circles and letters
    4 for letter outline
    5 for background
    6 general light/dark theme

     */
    // const palettes = [
    //   ['#E88BCA', '#B1F5FD', '#E63E2A', '#E63E2A', null, null],
    //   ['#A64AC9', '#FFB38F', '#FD6E23', '#FFFFFF', '#1F185B', 'dark'],
    //   ['#EA2E00', '#16A9E1', '#17E9E0', '#FFFFFF', null, null],
    //   ['#EA2E00', '#9DBDB8', '#ffcaaf', '#FFFFFF', null, null]
    // ]
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

    const paletteIndex = 0
    const palette = palettes[paletteIndex]

    // console.log('data', this.paletteIndex)

    // console.log('paletteIndex', paletteIndex, palette)

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

    return {
      windowSize,
      isMobile: isMobile,
      palettes,
      paletteIndex,
      palette,
      hoveredLetter: null,
      projects: null,
      ideas: null,
      isMounted: false,
      prefersHighContrast,
      highContrastPalette
    }
  },

  // beforeMount() {
  //   console.log('mounted', this.paletteIndex)
  // },

  // mounted() {
  //   console.log('mounted', this.paletteIndex)
  // },

  async asyncData({ $axios, env }) {
    const useDummyData = true

    if(useDummyData) {
      return {
        ideas: dummyIdeas,
        projects: dummyProjects,
        schedule: dummySchedule
      }
    } else {
      const baseUrl = 'https://api.airtable.com/v0/'

      const ideasUrl = baseUrl + 'appE17V3A75B99zBa/Ideas?api_key=' + env.airtableApiKey
      const ideas = await $axios.$get(ideasUrl)

      const projectsUrl = baseUrl + 'appE17V3A75B99zBa/Projects?api_key=' + env.airtableApiKey
      const projects = await $axios.$get(projectsUrl)

      const scheduleUrl = baseUrl + 'appE17V3A75B99zBa/Schedule?api_key=' + env.airtableApiKey
      const schedule = await $axios.$get(scheduleUrl)

      // console.log('ideas', ideas)
      // console.log('projects', projects)
      // console.log('schedule', schedule)

      return {
        ideas: ideas.records,
        projects: projects.records,
        schedule: schedule.records
      }
    }
  },

  mounted() {
    window.addEventListener('resize', this.onResize.bind(this))

    this.isMounted = true

    this.paletteIndex = Math.floor(Math.random()*this.palettes.length)
    this.palette = this.palettes[this.paletteIndex]

    const adjustedIndex = this.paletteIndex
    document.querySelector('body').classList.add('-palette-'+adjustedIndex)

    this.updateHighContrast()

    // console.log('ideas', this.ideas)
    // console.log('projects', this.projects)
    // console.log('schedule', this.schedule)
  },

  computed: {
    classObject() {
      const c = ['home']

      // Dark theme
      if(this.palette.theme) {
        c.push('-'+this.palette.theme)
      }

      c.push('-palette-'+this.paletteIndex)

      // console.log('classObject', this.paletteIndex)
      // console.log('palette', this.palette)
      // console.log('c', c)

      return c.join(' ')
    },

    styleObject() {
      const s = {}

      if(this.isMounted && process.browser && this.palette.background) {
        s.backgroundColor = this.palette.background
      }

      // console.log('styleObject', this.paletteIndex)
      // console.log('palette', this.palette)
      // console.log('s', s, JSON.stringify(s))

      return s
    }
  },

  methods: {
    hoverBannerLetter(letter) {
      if(this.prefersHighContrast) return

      this.hoveredLetter = letter

      document.querySelector('body').classList.remove('-palette-'+this.paletteIndex)

      const adjustedIndex = letter % this.palettes.length
      document.querySelector('body').classList.add('-palette-'+adjustedIndex)

      this.paletteIndex = letter%this.palettes.length
      this.palette = this.palettes[this.paletteIndex]
    },
    
    unhoverBannerLetter(letter) {
      if(this.prefersHighContrast) return

      if(this.hoveredLetter == letter) {
        this.hoveredLetter = null
      }
    },

    updateHighContrast() {
      if(process.browser) {
        this.prefersHighContrast = window.matchMedia('(prefers-contrast: more)').matches

        if(this.prefersHighContrast) {
          this.palette = this.highContrastPalette
          this.paletteIndex = this.palettes.length

          document.querySelector('body').classList.remove('-palette-'+this.paletteIndex)
          document.querySelector('body').classList.add('-palette-'+this.paletteIndex)
        }
      }
    },

    onResize() {
      if(process.browser) {
        this.windowSize = {
          width: window.innerWidth,
          height: window.innerHeight
        }

        this.isMobile = window.innerWidth < 640
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.home {
  transition: background-color 350ms animations.$ease;
}

</style>
