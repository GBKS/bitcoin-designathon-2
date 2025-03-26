<template>
  <div id="schedule" class="schedule-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :link="copy.link"
      :linkLabel="copy.linkLabel"
      :color="palette[1]"
    />
    <ScheduleList
      v-if="schedule"
      :dates="dates"
      :schedule="cleanSchedule"
      :palette="palette"
    />
  </div>
</template>

<script>
import copy from "~/assets/copy.json";

export default {

  props: [
    'palette',
    'schedule'
  ],

  data() {
    return {
      copy: copy.schedule,
      dates: copy.schedule.dates
    }
  },

  computed: {
    cleanSchedule() {
      const result = []

      let event
      for(let i=0; i<this.schedule.length; i++) {
        event = this.schedule[i]

        if(event.fields.Name && 
          event.fields.Name.length > 0 && 
          event.fields.Description && 
          event.fields.Description.length > 0
        ) {
          result.push(event)
        }
      }

      return result
    }
  }

}
</script>

