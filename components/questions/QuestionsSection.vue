<template>
  <div id="questions" class="questions-section -section">
    <SectionHeader
      :title="copy.title"
      :palette="palette"
    />
    <QuestionsQuestionList
      :questions="questions"
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
      copy: copy.questions,
      questions: copy.questions.questions
    }
  }

}
</script>

