import multer from "multer"


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Public/Temp')
  },
  filename: function (req, file, cb) { // write filename by which to save in temp folder
    cb(null, file.filename)
  }
})

export const upload = multer({ storage, })