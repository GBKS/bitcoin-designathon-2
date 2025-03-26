<template>
  <div id="prizes" class="prizes-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      :color="color"
    />
    <PrizesPrizeList
      :prizes="copy.prizes"
      :palette="palette"
      :color="color"
    />
    <PrizesSponsorList
      :sponsors="copy.sponsors"
      :palette="palette"
      :color="color"
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
      copy: copy.prizes
    }
  },

  computed: {
    color() {
      return this.palette[0]
    }
  },

  methods: {

  }

}
</script>

