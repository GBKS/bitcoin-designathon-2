<template>
  <div :class="classObject" :style="styleObject">
    <Banner
      :isMobile="isMobile"
      :palette="palette"
      @hoverLetter="hoverBannerLetter"
      @unhoverLetter="unhoverBannerLetter"
    />
    <InfoSection 
      v-if="false"
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
      v-if="false"
      :palette="palette"
    />
  </div>
</template>

<script>
import dummyIdeas from "~/assets/ideas.json";
import dummyProjects from "~/assets/projects.json";
import dummySchedule from "~/assets/schedule.json";

export default {

  data() {
    /*

    1-3 for circles and letters
    4 for letter outline
    5 for background
    6 general light/dark theme

     */
    const palettes = [
      ['#E88BCA', '#B1F5FD', '#E63E2A', '#E63E2A', null, null],
      ['#A64AC9', '#FFB38F', '#FD6E23', '#FFFFFF', '#1F185B', 'dark'],
      ['#EA2E00', '#16A9E1', '#17E9E0', '#FFFFFF', null, null],
      ['#EA2E00', '#9DBDB8', '#ffcaaf', '#FFFFFF', null, null]
    ]

    const paletteIndex = Math.floor(Math.random()*palettes.length)
    const palette = palettes[paletteIndex]

    // console.log('data', this.paletteIndex)

    // console.log('paletteIndex', paletteIndex, palette)

    let windowSize, isMobile

    if(process.browser) {
      windowSize = {
        width: window.innerWidth,
        height: window.innerHeight
      }

      isMobile = window.innerWidth < 640
    }

    return {
      windowSize,
      isMobile: isMobile,
      palettes,
      paletteIndex,
      palette,
      hoveredLetter: null,
      projects: null,
      ideas: null
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

    // console.log('ideas', this.ideas)
    // console.log('projects', this.projects)
    // console.log('schedule', this.schedule)
  },

  computed: {
    classObject() {
      const c = ['home']

      // Dark theme
      if(this.palette[5]) {
        c.push('-'+this.palette[5])
      }

      c.push('-palette-'+this.paletteIndex)

      // console.log('classObject', this.paletteIndex)
      // console.log('palette', this.palette)
      // console.log('c', c)

      return c.join(' ')
    },

    styleObject() {
      const s = {}

      if(process.browser && this.palette[4]) {
        s.backgroundColor = this.palette[4]
      }

      // console.log('styleObject', this.paletteIndex)
      // console.log('palette', this.palette)
      // console.log('s', s)

      return s
    }
  },

  methods: {
    hoverBannerLetter(letter) {
      this.hoveredLetter = letter
      this.paletteIndex = letter%this.palettes.length
      this.palette = this.palettes[this.paletteIndex]
    },
    
    unhoverBannerLetter(letter) {
      if(this.hoveredLetter == letter) {
        this.hoveredLetter = null
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
