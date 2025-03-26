<template>
  <div id="partners" class="partner-section -section">
    <SectionHeader
      :title="copy.title"
      :description="copy.description"
      color="0"
    />
    <PartnersPartnerList
      :partners="partners"
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
      copy: copy.partners,
      partners: copy.partners.partners
    }
  }

}
</script>

<style lang="scss" scoped>

@use "@/assets/css/mixins.scss";

.partner-section {

}

</style>



