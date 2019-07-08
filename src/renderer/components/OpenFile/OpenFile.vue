<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
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
    console.log(path)
    this.open(path)
    this.open('/home/khanht/Desktop/code/code/electron_open_file/static/yunxi-excel.xls')
  }
}
</script>
