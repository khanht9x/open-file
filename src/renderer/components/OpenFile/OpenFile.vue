<template>
  <div id="wrapper">
    <p>Yunxi File</p>
    <p v-if="!this.doneExtra && fileExits">Vui lòng chờ trong ít phút để hoàn thành quá trình cài đặt: <span style="color:red"> {{ parseInt(processData) }} % </span></p>
    <p>{{ pathZip }}</p>
  </div>
</template>

<script>
import Seven from 'node-7z'
const path = require('path')
const fs = require('fs')
export default {
  name: 'open-file',
  data () {
    return {
      path: '',
      pathExcel: '',
      processData: 0,
      doneExtra: false,
      fileExits: false
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  },
  mounted () {
    this.pathZip = path.join(path.dirname(__dirname), '../../extraResources/Yunxi.7z')
    this.pathExcel = path.join(path.dirname(__dirname), '../../extraResources/yunxi-excel.xls')
    try {
      if (fs.existsSync(this.pathZip)) {
        this.fileExits = true
      } else {
        this.fileExits = false
      }
    } catch (err) {
      console.error(err)
    }

    this.open(this.pathExcel)
    if (this.fileExits) {
      // myStream is an Readable stream
      const myStream = Seven.extractFull(this.pathZip, path.join(path.dirname(__dirname), '../../extraResources'), {
        $progress: true
      })

      myStream.on('data', data => {
        console.log(data) // ? { status: 'extracted', file: 'extracted/file.txt" }
      })

      myStream.on('progress', progress => {
        this.processData = progress.percent
      })

      myStream.on('end', () => {
        this.doneExtra = true
        console.log('Finished extracting')
        try {
          // fs.unlinkSync(this.pathZip)
        } catch (err) {
          console.error(err)
        }
      })

      myStream.on('error', (err) => {
        alert(err)
      })
    }
  }
}
</script>
