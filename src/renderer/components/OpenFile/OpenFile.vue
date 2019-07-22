<template>
  <div id="wrapper">
    <p>Yunxi Auto</p>
    <div class="version" style="position: fixed; right: 30px; bottom: 30px;">
      <p><small>Version 1.01</small></p>
      <p><small>093.595.0000</small></p>
    </div>
    <p v-if="!doneExtra && fileExits">Vui lòng chờ trong ít phút để hoàn thành quá trình cài đặt: <span style="color:red"> {{ parseInt(processData) }} % </span></p>
  </div>
</template>

<script>
import Seven from 'node-7z'
import sevenBin from '7zip-bin'
require('hazardous')
const path = require('path')
const fs = require('fs')
export default {
  name: 'open-file',
  data () {
    return {
      path: '',
      pathExcel: '',
      pathTo7zip: '',
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
    this.pathTo7zip = sevenBin.path7za.replace('app.asar', 'app.asar.unpacked')
    this.pathZip = path.join(path.dirname(__dirname), '../../extraResources/Yunxi.7z')
    try {
      if (fs.existsSync(this.pathZip)) {
        this.fileExits = true
      } else {
        this.fileExits = false
      }
    } catch (err) {
      console.error(err)
    }

    if (this.fileExits) {
      // myStream is an Readable stream
      const myStream = Seven.extractFull(this.pathZip, path.join(path.dirname(__dirname), '../../extraResources'), {
        $progress: true,
        $bin: this.pathTo7zip
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
          fs.unlinkSync(this.pathZip)
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
