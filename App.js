require('dotenv').config({path: __dirname + '/.env'})
const baseDir = process.env['UPLOADFOLDER']
var express = require('express')
var multer  = require('multer')
const exec = require('await-exec')
const app = express()
const port = 5000
var fs = require('fs');
if (!fs.existsSync(`${baseDir}/nisetube`)){
    fs.mkdirSync(`${baseDir}/nisetube`)
    fs.mkdirSync(`${baseDir}/nisetube/temp`)
    fs.mkdirSync(`${baseDir}/nisetube/storage`)
    exec(`cp ./Data.csv ${baseDir}/nisetube/storage/Data.csv`)
}
const upload = multer({dest:`${baseDir}/nisetube/temp/`})
const csv = require('csv-parser')
var csvWriter = require('csv-write-stream')
var writer = csvWriter({sendHeaders: false})
writer.pipe(fs.createWriteStream(`${baseDir}/nisetube/storage/Data.csv`, {flags: 'a'}))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/getinfo/:videoId', async(req,res) =>{
  var isFound = false;
  fs.createReadStream(`${baseDir}/nisetube/storage/Data.csv`)
  .pipe(csv())
  .on('data', (row) => {
    if(row.fileId === req.params.videoID ){
      res.status(200).json(row)
      isFound = true
    }
  })
})

app.get('/getlist', (req,res) =>{
  const results = []
  fs.createReadStream(`${baseDir}/nisetube/storage/Data.csv`)
  .pipe(csv())
  .on('data', (row) => {
    results.push(row)
  })
  .on('end', () => {
    res.status(200).json(results)
  })
})

app.listen(port, () => {
    console.log('listening to port: ' + port)
})

app.post('/upload', upload.single('somevideo'), async(req, res) => {
  try {

    const file = req.file
    await exec(`mkdir ${baseDir}/nisetube/storage/${file.filename}`)

    //分けたファイルをFrontに渡す方法わからない
    /*await exec(`ffmpeg -i temp/${file.filename} -vf scale=w=1280:h=720:force_original_aspect_ratio=decrease -c:a aac \
    -ar 48000 -b:a 128k -c:v h264 -profile:v main -crf 20 -g 48 -keyint_min 48 -sc_threshold 0 \
    -b:v 2500k -maxrate 2675k -bufsize 3750k -hls_time 4 -hls_playlist_type vod -hls_segment_filename \
    storage/${file.filename}/720p_%03d.ts storage/${file.filename}/720p.m3u8`)*/

    await exec(`ffmpeg -i ${baseDir}/nisetube/temp/${file.filename} -f mp4 -vcodec libx264 -preset fast -profile:v main -acodec aac ${baseDir}/nisetube/storage/${file.filename}/${file.filename}.mp4 -hide_banner`)
    await writer.write({original: file.originalname, ext: file.mimetype, filename: file.filename})

    res.status(200).json("Success :D")
  }catch(err) {
    console.log(err)
    res.status(400).send("Someting Wrong :(")
  }
})

app.get('/video/:videoID', function(req, res) {
  const videoID = req.params.videoID
  const path = `${baseDir}/nisetube/storage/${videoID}/${videoID}.mp4`
  const stat = fs.statSync(path)
  const fileSize = stat.size
  const range = req.headers.range
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1] 
      ? parseInt(parts[1], 10)
      : fileSize-1
    const chunksize = (end-start)+1
    const file = fs.createReadStream(path, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(path).pipe(res)
  }
});
