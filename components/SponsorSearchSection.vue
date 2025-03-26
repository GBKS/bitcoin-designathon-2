<template>
  <div id="sponsor-search" class="sponsor-search-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :link="copy.link"
      :linkLabel="copy.linkLabel"
      :color="palette[0]"
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
      copy: copy.sponsors
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/mixins.scss";

.info-section {
  
}

</style>