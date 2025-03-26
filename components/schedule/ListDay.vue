<template>
  <div
    :id="elementId"
    :class="classObject"
  >
    <div class="title">
      <h3
        role="button"
        :aria-controls="'day-content-'+this.dayId"
        :aria-expanded="expanded"
        @click="toggleExpand"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.0781 10.7682L6.64018 18.6332C5.98886 19.176 5 18.7128 5 17.865L5 2.13504C5 1.2872 5.98886 0.824045 6.64018 1.36682L16.0781 9.23178C16.5579 9.63157 16.5579 10.3684 16.0781 10.7682Z" :fill="palette[1]" stroke="black"/>
          </svg><span v-html="day.label" /></h3>
      <p class="-count">{{ eventCount }}</p>
    </div>
    <div
      :id="'day-content-'+this.dayId"
      :aria-hidden="expanded ? 'false' : 'true'"
      :style="contentStyle"
    >
      <div ref="content">
        <ScheduleListEvent
          v-if="events.length > 0"
          v-for="item in events"
          :key="item.id"
          :palette="palette"
          :event="item"
        />
        <p v-if="events.length == 0">No events scheduled yet.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'dayId',
    'day',
    'schedule',
    'activeDayId'
  ],

  data() {
    const elementId = this.dayId

    return {
      elementId: 'day-' + elementId,
      contentHeight: 0,
      visible: false
    }
  },

  watch: {
    expanded() {
      this.updateContentHeight()
    }
  },

  mounted() {
    this.updateContentHeight()

    setTimeout(this.setVisible.bind(this), 5)
  },

  computed: {
    classObject() {
      const c = ['schedule-list-day']

      if(this.expanded) {
        c.push('-expanded')
      }

      if(this.visible) {
        c.push('-visible')
      }

      if(this.enabled) {
        c.push('-enabled')
      } else {
        c.push('-disabled')
      }

      return c.join(' ')
    },

    isToday() {
      let result = false

      if(process.browser) {
        const now = new Date()
        const dateObject = new Date(this.dayId)
        if(now.getFullYear() == dateObject.getFullYear() &&
          now.getMonth() == dateObject.getMonth() &&
          now.getDate() == dateObject.getDate()
        ) {
          result = true
        }
      }

      return result
    },

    contentStyle() {
      // let height = 0

      // if(this.expanded && this.$refs.content) {
      //   height = this.$refs.content.offsetHeight
      // }

      return { height: this.contentHeight + 'px' }
    },

    expanded() {
      return this.dayId == this.activeDayId
    },

    enabled() {
      return this.eventCount > 0
    },

    events() {
      const result = []

      let scheduleEvent, eventDay
      for(let i=0; i<this.schedule.length; i++) {
        scheduleEvent = this.schedule[i]

        if(scheduleEvent.fields.Date && scheduleEvent.fields.Status == 'Visible') {
          eventDay = scheduleEvent.fields.Date.substr(0, 10)

          if(eventDay == this.dayId) {
            result.push(scheduleEvent)
          }
        }
      }

      // Add sorting.
      result.sort(function(a, b){
        if(a.fields.Date < b.fields.Date) return -1
        if(a.fields.Date > b.fields.Date) return 1
        return 0
      })

      return result
    },

    eventCount() {
      return this.events.length
    }
  },

  methods: {
    toggleExpand() {
      // this.expanded = !this.expanded

      if(this.enabled) {
        this.$emit('toggle', {
          id: this.dayId, 
          expanded: !this.expanded
        })
      }
    },

    updateContentHeight() {
      let result = 0

      if(this.enabled && this.expanded && this.$refs.content) {
        result = this.$refs.content.offsetHeight
      }

      this.contentHeight = result
    },

    setVisible() {
      this.visible = true
    }
  }
}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.schedule-list-day {
  padding-top: 15px;
  padding-bottom: 15px;

  .title {
    display: flex;
    align-items: center;

    h3 {
      font-weight: 600;
      transition: all 100ms animations.$ease;
      @include mixins.r('font-size', 18, 24);

      svg {
        margin-right: 10px;
        transition: all 150ms animations.$ease;
        vertical-align: middle;
        transform: translateY(-2px);

        path {
          stroke: var(--front);
        }
      }

      span {
        i {
          font-weight: 400;
          font-style: normal;
          color: rgba(var(--frontRGB), 0.5);
        }
      }
    }

    p {
      &.-count {
        margin-left: 10px;
        font-weight: 600;
        background-color: rgba(var(--frontRGB), 0.1);
        border-radius: 5px;
        padding: 0 6px;
        @include mixins.r('font-size', 12, 14);
      }

      &.-today {
        margin-left: 10px;
        padding: 2px 9px 3px 9px;
        color: white;
        background-color: var(--palette-0);
        border-radius: 20px;
        @include mixins.r('font-size', 11, 13);
      }
    }
  }

  &.-disabled {
    .title {
      h3,
      p {
        opacity: 0.25;
      }
    }
  }

  &.-enabled {
    .title {
      h3 {
        cursor: pointer;

        &:hover {
          color: var(--palette-1);
        }
      }
    }
  }

  > div {
    overflow-y: hidden;

    > div {
      padding-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      justify-content: stretch;
    }
  }

  &.-visible {
    > div {
      transition: height 400ms animations.$ease;
    }
  }

  &.-expanded {
    h3 {
      svg {
        transform: translateY(-2px) rotate(90deg);
      }
    }
  }
}

</style>

