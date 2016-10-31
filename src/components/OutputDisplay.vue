<template>
  <div class="col-md-3 col-sm-6" v-if="content">
    <div>
      <h4>{{ description }}</h4>
      <textarea :value="content"></textarea>
      <a :href="downloadable" :download="filename" class="btn btn-sm btn-primary">
        Download <strong>{{ filename }}</strong>
        <span class="glyphicon glyphicon-download-alt" aria-hidden="true"></span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'longcsv',
  props: ['description', 'filename', 'content'],
  computed: {
    downloadable () {
      const blob = new Blob([this.content], {type: 'octet/stream'})
      const url = window.URL.createObjectURL(blob)
      return url
    }
  }
}
</script>

<style scoped>
textarea {
  width: 100%;
  height: 100px;
  font-size: 0.85em;
}
</style>