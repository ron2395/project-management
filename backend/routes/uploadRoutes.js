import express from "express";
import multer from "multer";
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

const router = express.Router();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function(req, file, cb){
      cb(
        null, file.originalname
      );
    }
  })
})

router.post("/", upload.single("image"), (req, res) => {
  res.send(`${req.file.location}`);
})

export default router;
