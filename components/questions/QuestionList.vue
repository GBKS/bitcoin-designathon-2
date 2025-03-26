<template>
  <div class="question-list">
    <QuestionsQuestionListItem
      v-for="(item, index) in questions"
      :key="index"
      :index="index"
      :question="item"
      :palette="palette"
      :activeId="activeId"
      @close="close"
      @select="select"
    />
  </div>
</template>

<script>
export default {

  props: [
    'questions',
    'palette'
  ],

  data() {
    return {
      activeId: null
    }
  },

  mounted() {
    if(process.browser) {
      window.addEventListener('hashchange', this.checkHash.bind(this))
      
      this.checkHash(true)
    }
  },

  methods: {
    select(activeId) {
      this.activeId = activeId
    },

    close(id) {
      if(this.activeId == id) {
        this.activeId = null
      }
    },

    checkHash(scrollToSection) {
      // Looks like #question-when-and-where
      const fullHash = window.location.hash

      if(fullHash && fullHash.indexOf('-') !== -1) {
        let hash = fullHash.substr(fullHash.indexOf('-')+1)

        for(let i=0; i<this.questions.length; i++) {
          if(this.questions[i].i == hash) {
            this.activeId = hash

            if(scrollToSection) {
              const questionsSection = document.getElementById('questions')
              window.scrollTo(0, questionsSection.offsetTop)
            }

            break;
          }
        }
      } else {
        this.activeId = null
      }
    }
  }

}
</script>

<style lang="scss" scoped>

.question-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  max-width: 800px;
}

</style>

