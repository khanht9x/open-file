<template>
  <div id="wrapper">
    <p>Hello Word</p>
  </div>
</template>

<script>
export default {
  name: 'open-file',
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  },
  mounted () {
    const path = __static + '/yunxi-excel.xls'
    this.open(path)
  }
}
</script>
