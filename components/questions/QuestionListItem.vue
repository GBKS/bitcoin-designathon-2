<template>
  <div
    v-if="!question.hidden"
    :id="elementId"
    :class="classObject"
  >
    <h3
      role="button"
      :aria-controls="'question_'+this.index"
      :aria-expanded="expanded"
      @click="toggleExpand"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.0781 10.7682L6.64018 18.6332C5.98886 19.176 5 18.7128 5 17.865L5 2.13504C5 1.2872 5.98886 0.824045 6.64018 1.36682L16.0781 9.23178C16.5579 9.63157 16.5579 10.3684 16.0781 10.7682Z" :fill="palette[0]" stroke="black"/>
        </svg>{{ question.q }}</h3>
    <div
      :id="'question_'+this.index"
      :aria-hidden="expanded ? 'false' : 'true'"
      :style="contentStyle"
    >
      <div
        ref="content"
        v-html="question.a"
      />
    </div>
  </div>
</template>

<script>
export default {

  props: [
    'question',
    'palette',
    'index',
    'activeId'
  ],

  data() {
    const elementId = this.question.i

    return {
      elementId: 'question-' + elementId
    }
  },

  watch: {
    hash() {
      if(!this.expanded && this.hash == this.elementId) {
        // this.expanded = true
      }
    }
  },

  computed: {
    classObject() {
      const c = ['question-list-item']

      if(this.expanded) {
        c.push('-expanded')
      }

      return c.join(' ')
    },

    expanded() {
      return this.activeId == this.question.i
    },

    contentStyle() {
      let height = 0

      if(this.expanded) {
        height = this.$refs.content.offsetHeight
      }

      return { height: height + 'px' }
    }
  },

  methods: {
    toggleExpand() {
      if(this.expanded) {
        this.$emit('close', this.question.i)
        history.pushState(null, null, '')
      } else {
        window.location.hash = 'question-'+this.question.i
      }
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.question-list-item {
  border-top: 1px solid rgba(var(--frontRGB), 0.1);
  padding-top: 15px;
  padding-bottom: 15px;

  &:first-child {
    border-width: 0;
  }

  h3 {
    font-weight: 900;
    cursor: pointer;
    transition: all 100ms animations.$ease;
    @include mixins.r('font-size', 18, 21);

    svg {
      margin-right: 10px;
      transition: all 150ms animations.$ease;
      vertical-align: middle;

      path {
        stroke: var(--front);
      }
    }

    &:hover {
      color: var(--palette-0);
    }
  }

  p {
    padding-left: 30px;
    @include mixins.r('font-size', 15, 20);
    // color: #606060;
  }

  ul {
    li {
      color: rgba(var(--frontRGB), 0.75);

      & + li {
        margin-top: 10px;
      }
    }
  }

  > div {
    overflow-y: hidden;
    transition: height 400ms animations.$ease;

    > div {
      padding-top: 10px;
    }
  }

  &.-expanded {
    h3 {
      svg {
        transform: rotate(90deg);
      }
    }
  }
}

</style>


