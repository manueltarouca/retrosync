import express from 'express';
import multer from 'multer';
import cors from 'cors'

const PORT = 3000;

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());

app.post('/upload', upload.single('file'), function (req, res, next) {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})