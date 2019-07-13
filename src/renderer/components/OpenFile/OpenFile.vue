<template>
  <div id="wrapper">
    <p>Yunxi File</p>
  </div>
</template>

<script>
const path = require('path')
export default {
  name: 'open-file',
  data () {
    return {
      path: ''
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  },
  mounted () {
    this.path = path.join(path.dirname(__dirname), '../../extraResources/yunxi-excel.xls')
    this.open(this.path)
  }
}
</script>
