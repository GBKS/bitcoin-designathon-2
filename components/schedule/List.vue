<template>
  <div class="schedule-list">
    <ScheduleListDay
      v-for="(item, id) in dates"
      :key="item.id"
      :palette="palette"
      :dayId="id"
      :day="item"
      :schedule="schedule"
      :activeDayId="activeId"
      @toggle="toggleDay"
    />
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'dates',
    'schedule'
  ],

  data() {
    let activeId = Object.keys(this.dates)[0]

    return {
      activeId: activeId
    }
  },

  computed: {

  },

  methods: {
    toggleDay(info) {
      if(info.expanded) {
        this.activeId = info.id
      } else {
        this.activeId = null
      }
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.schedule-list {
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0px;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  max-width: 800px;
}

</style>

