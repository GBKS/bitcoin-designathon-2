<template>
  <div
    :id="elementId"
    class="idea-list-item" 
    role="button"
    @mouseenter="hover" 
    @mouseleave="unhover"
  >
    <BoxSideDepth
      :color="color"
      :hovering="hovering"
    />
    <h3><a :href="'#project-'+this.idea.id">{{ name }}</a></h3>
    <p v-if="description" v-html="shortenedDescription" />
    <IdeasIdeaListItemProjects
      :idea="idea"
      :projects="projects"
      align="center"
    />
    <SuperButton
      :link="'#idea-'+this.idea.id"
      label="More info"
      size="small"
      :color="color"
      :textColor="textColor"
      :invert="true"
    />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'idea',
    'projects',
    'color',
    'textColor'
  ],

  data() {
    return {
      hovering: false
    }
  },

  computed: {
    elementId() {
      return 'idea-summary-'+this.idea.id
    },

    name() {
      return this.idea.fields.Name
    },

    description() {
      return this.idea.fields.Description
    },

    shortenedDescription() {
      let result = this.idea.fields.Description

      // Strip Markdown
      result = result.split('**').join('')
      result = result.split('\\-').join('')

      if(result.length > 100) {
        result = result.substr(0, 98) //  <b>more</b>

        const lastIndex = result.lastIndexOf(' ')
        if(lastIndex > result.length - 10) {
          result = result.substr(0, lastIndex)
        }

        result += '...'
      }

      return result
    }
  },

  methods: {
    hover() {
      this.hovering = true
    },

    unhover() {
      this.hovering = false
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.idea-list-item {
  position: relative;
  background-color: white;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 20px 40px;
  box-shadow: -8px 8px 0 rgba(black, 0.07);
  flex-grow: 1;
  transition: all 250ms animations.$ease;
  box-sizing: border-box;

  h3 {
    text-align: center;
    font-weight: 900;
    @include mixins.r('font-size', 22, 27);

    a {
      color: black;
      text-decoration: none;
      transition: all 150ms animations.$ease;

      &:hover {
        color: var(--palette-0);
        cursor: pointer;
      }
    }
  }

  p {
    margin: 10px 0 0 0;
    text-align: center;
    color: rgba(black, 0.75);
    @include mixins.r('font-size', 15, 18);

    a {
      color: black;
    }
  }

  > a {
    margin-top: 20px;
  }

  &:hover {
    transform: translate(-3px, 5px);
    box-shadow: -4px 4px 0 rgba(black, 0.15);
  }

  @include mixins.media-query(medium) {
    flex-basis: 40%;
  }

  @include mixins.media-query(large) {
    flex-basis: 26%;
  }
}

</style>


