<template>
  <div id="ideas" class="ideas-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :link="copy.link"
      :linkLabel="copy.linkLabel"
      :color="palette.button.background"
      :textColor="palette.button.label"
    />
    <IdeasIdeaList
      v-if="false && cleanIdeas"
      :ideas="cleanIdeas"
      :projects="projects"
      :palette="palette"
      :color="palette.button.background"
      :textColor="palette.button.label"
    />
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
      copy: copy.ideas,
      shuffleIdeas: false
    }
  },

  mounted() {
    this.shuffleIdeas = true
  },

  computed: {
    cleanIdeas() {
      let result = null

      if(this.ideas) {
        let idea
        for(let i=0; i<this.ideas.length; i++) {
          idea = this.ideas[i]

          if(idea.fields.Name && 
            idea.fields.Name.length > 0 && 
            idea.fields.Description && 
            idea.fields.Description.length > 0 && 
            idea.fields.Status == 'Visible'
          ) {
            if(!result) {
              result = []
            }
            result.push(idea)
          }
        }

        if(result && this.shuffleIdeas) {
          result = this.shuffle(result)
        }
      }

      return result
    },

    color() {
      return this.palette[0]
    }
  },

  methods: {
    shuffle(a) {
      let j, x, i;
      for(i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
  }

}
</script>

