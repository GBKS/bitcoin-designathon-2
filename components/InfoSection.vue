<template>
  <div id="info" class="info-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :palette="palette"
    />
  </div>
</template>

<script>
import copy from "~/assets/copy.json";

export default {

  props: [
    'palette'
  ],

  data() {
    return {
      copy: copy.info.comingup
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/mixins.scss";

.info-section {
  
}

</style>