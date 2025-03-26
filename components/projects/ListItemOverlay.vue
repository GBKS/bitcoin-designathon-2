<template>
  <transition
    v-if="project"
    appear
  >
    <div
      ref="canvas"
      class="project-list-item-overlay"
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
            :color="color"
            :hovering="hovering"
          />
          <h3>{{ name }}</h3>
          <div class="description" v-html="formattedDescription" />
          <ProjectsListItemIdeas
            :project="project"
            :ideas="ideas"
          />
          <SuperButton
            v-if="false"
            :link="joinLink"
            label="Join project"
            :color="color"
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
    'projects',
    'ideas',
    'color'
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
    project() {
      let result

      for(let i=0; i<this.projects.length; i++) {
        if(this.projects[i].id == this.activeId) {
          result = this.projects[i]
          break
        }
      }

      return result
    },

    name() {
      return this.project.fields.Name
    },

    description() {
      return this.project.fields.Description
    },

    formattedDescription() {
      let result = this.$md.render(this.description)

      result = result.split('<a').join('<a target="_blank" rel="nofollow noindex"')

      return result
    },

    joinLink() {
      return 'https://airtable.com/shrKk3LXmnAe1YsGV?prefill_Projects='+this.project.id
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
      if(this.project && event.which == 27) {
        this.close()
      }
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.project-list-item-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--palette-2-rgb), 0.8);
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
      padding: 30px 30px 30px 50px;
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

      h3 {
        font-weight: 900;
        color: black;
        padding-right: 25px;
        @include mixins.r('font-size', 22, 27);
      }

      .description {
        overflow-y: scroll;

        p {
          margin-top: 10px;
          color: rgba(black, 0.75);
          @include mixins.r('font-size', 16, 21);

          a {
            color: black;
            word-break: break-word;
          }
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


