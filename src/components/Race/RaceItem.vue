<template>
  <div class="race" v-bind:style="{ 'background-image': getBackgroundImage() }">
    <div class="race__overlay">
    </div>
    <div class="race__info">
      <div class="name">
        {{ info.name }}
        <br/>
      </div>
      <div class="date">
        {{info.date | date}}
      </div>
       
      <div class="type">
        {{ info.type }}
      </div>
      <div class="race__button">
        <router-link class="btn btn--primary" :to="{ path: path }">VIEW</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'race-item',
  data: () => ({
    path: ''
  }),
  props: {
    info: {
      type: Object,
      required: true
    },
    type: {
      type: String
    }
  },
  methods: {
    getBackgroundImage () {
      if (this.info.urlImage) {
        return `url(${this.info.urlImage})`
      }
      return false
    },
    mountPath () {
      const finalPath = this.type ? `/${this.type}` : ''
      this.path = `/admin/live-run/race/${this.info.id}${finalPath}`
    }
  },
  created () {
    this.mountPath()
  }
}
</script>
