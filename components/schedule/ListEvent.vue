<template>
  <div
    :id="elementId"
    class="schedule-list-event" 
  >
    <div class="copy">
      <h3>
        {{ name }}
        <span class="-date" v-html="formattedDate" />
        <client-only>
          <span class="-live" v-if="isLive">Happening now</span>
        </client-only>
      </h3>
      <p v-if="false" v-html="formattedDate" />
      <client-only>
        <MDC :value="description" tag="p" />
      </client-only>
    </div>
    <client-only>
      <MDC class="link" :value="link" tag="div" />
    </client-only>
  </div>
</template>

<script>
export default {

  props: [
    'palette',
    'event'
  ],

  computed: {
    elementId() {
      return 'schedule-event-'+this.event.id
    },

    name() {
      return this.event.fields.Name
    },

    description() {
      return this.event.fields.Description
    },

    isLive() {
      let result = false

      if(process.browser) {
        const now = new Date()
        const dateObject = new Date(this.event.fields.Date)
        const delta = (dateObject - now)/60/60/1000
        if(delta > 0 && delta < 1) {
          result = true
        }
      }

      return result
    },

    formattedDate() {
      const dateObject = new Date(this.event.fields.Date)

      const minutes = dateObject.getMinutes()

      var zone = dateObject.toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2]

      return '@ ' + dateObject.getHours()+':'+(minutes > 9 ? minutes : '0' + minutes)+' '+zone
    },

    link() {
      return this.event.fields.Link
    }
  }

}
</script>

<style lang="scss">

@use "@/assets/css/animations.scss";
@use "@/assets/css/mixins.scss";

.schedule-list-event {
  display: flex;
  align-items: center;
  gap: 20px;
  border-top: 1px solid rgba(var(--frontRGB), 0.1);
  padding-top: 20px;
  padding-bottom: 20px;

  .copy {
    flex-grow: 1;

    h3 {
      font-weight: 600;
      @include mixins.r('font-size', 18, 21);

      span {
        &.-date {
          padding-left: 10px;
          font-weight: 500;
          color: rgba(var(--frontRGB), 0.5);
        }

        &.-live {
          display: inline-block;
          margin-left: 5px;
          padding: 2px 9px 3px 9px;
          color: white;
          background-color: var(--palette-0);
          border-radius: 20px;
          transform: translateY(-3px);
          @include mixins.r('font-size', 11, 13);
        }
      }
    }

    p {
      margin-top: 10px;
      @include mixins.r('font-size', 15, 19);
    }
  }

  .link {
    p {
      font-weight: 600;
      @include mixins.r('font-size', 15, 19);
    }
  }
}

</style>


