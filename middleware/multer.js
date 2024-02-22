const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    const clientId = req.body.clientId;
    return cb(null, `${clientId}-${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

module.exports = upload;
