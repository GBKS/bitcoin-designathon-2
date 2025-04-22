<template>
  <transition
    v-if="idea"
    appear
  >
    <div
      ref="canvas"
      class="idea-list-item-overlay"
      @click="clickBackground"
    >
      <div class="wrap">
        <div
          class="content"
          @mouseenter="hover" 
          @mouseleave="unhover"
        >
          <button @click="close" title="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L13 13" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
              <path d="M13 1L1.00001 13" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
          <BoxSideDepth
            :color="palette[0]"
            :hovering="hovering"
          />
          <h3>{{ name }}</h3>
          <MDC class="description" :value="description"  />
          <IdeasIdeaListItemProjects
            :idea="idea"
            :projects="projects"
          />
          <SuperButton
            v-if="!false"
            :link="createLink"
            label="Create project"
            :color="color"
            :textColor="textColor"
            size="small"
            :invert="true"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

  props: [
    'activeId',
    'palette',
    'ideas',
    'projects',
    'color',
    'textColor'
  ],

  data() {
    return {
      hovering: false,
      keyCallback: null
    }
  },

  mounted() {
    if(process.browser) {
      this.keyCallback = this.keyUp.bind(this)
      window.addEventListener('keyup', this.keyCallback)
    }
  },

  beforeDestroy() {
    if(process.browser) {
      window.removeEventListener('keyup', this.keyCallback)
    }
  },

  computed: {
    idea() {
      let result

      for(let i=0; i<this.ideas.length; i++) {
        if(this.ideas[i].id == this.activeId) {
          result = this.ideas[i]
          break
        }
      }

      return result
    },

    name() {
      return this.idea.fields.Name
    },

    description() {
      return this.idea.fields.Description
    },

    formattedDescription() {
      let result = this.$md.render(this.description)

      result = result.split('<a').join('<a target="_blank" rel="nofollow noindex"')

      return result
    },

    projectList() {
      let result = []

      if(this.idea.fields.Projects) {
        let projectId, project, i, k
        for(i=0; i<this.idea.fields.Projects.length; i++) {
          projectId = this.idea.fields.Projects[i]

          for(k=0; i<this.projects.length; i++) {
            project = this.projects[i]

            if(project.id == projectId) {
              result.push(project)
            }
          }
        }
      }

      if(result.length == 0) {
        result = null
      }

      return result
    },

    createLink() {
      return 'https://airtable.com/appAR943q3FpYsoDk/pagQSTbNza6dVi39z/form?prefill_Idea='+this.idea.id
    }
  },

  methods: {
    hover() {
      this.hovering = true
    },

    unhover() {
      this.hovering = false
    },

    close() {
      this.$emit('close')
      history.pushState("", document.title, window.location.pathname);
    },

    clickBackground(event) {
      if(event.target == this.$refs.canvas) {
        this.close()
      }
    },

    keyUp(event) {
      if(this.idea && event.which == 27) {
        this.close()
      }
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.idea-list-item-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--palette-0-rgb), 0.8);
  z-index: 10;
  overscroll-behavior-y: contain;

  .wrap {
    padding: 15px;

    .content {
      position: relative;
      background-color: white;
      border: 1px solid black;
      border-radius: 15px;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      max-width: 800px;
      flex-direction: column;
      padding: 30px 10px 30px 50px;
      box-shadow: -8px 8px 0 rgba(black, 0.07);
      flex-grow: 1;
      max-height: 80vh;

      button {
        position: absolute;
        right: 20px;
        top: 20px;
        appearance: none;
        background-color: transparent;
        border-width: 0;
        padding: 8px;
        line-height: 0;
        cursor: pointer;
      }

      > h3 {
        font-weight: 900;
        color: black;
        padding-right: 25px;
        @include mixins.r('font-size', 22, 27);
      }

      .description {
        overflow-y: scroll;
        padding-right: 20px;

        > h2 {
          font-weight: 900;
          color: black;
          padding-right: 25px;
          @include mixins.r('font-size', 22, 24);
        }


        > h3 {
          font-weight: 900;
          color: black;
          padding-right: 25px;
          @include mixins.r('font-size', 19, 19);
        }

        p {
          margin-top: 10px;
          color: rgba(black, 0.75);
          @include mixins.r('font-size', 16, 19);

          strong {
            font-weight: 600;
            color: black;
          }

          a {
            color: black;
          }

          & + p,
          & + h2,
          & + h3 {
            margin-top: 20px;
          }
        }

        ul, ol {
          li {
            color: rgba(black, 0.75);
            @include mixins.r('font-size', 16, 19);
          }
        }

        code {
          margin-top: 20px;
          margin-bottom: 20px;
          display: inline-block;
          padding: 10px;
          border-radius: 5px;
          background-color: rgba(black, 0.05);
        }
      }

      > a {
        margin-top: 30px;
      }
    }
  }

  &.v-enter-active,
  &.v-leave-active {
    transition: all 400ms animations.$ease;

    .wrap {
      .content {
        transition: all 400ms animations.$ease;
      }
    }
  }

  &.v-enter,
  &.v-leave-to {
    opacity: 0;

    .wrap {
      .content {
        transform: translateY(50px);
      }
    }
  }
}

</style>