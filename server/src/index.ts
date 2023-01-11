import express from 'express';
import multer from 'multer';
import cors from 'cors'

const PORT = 3001;

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());

app.post('/upload', upload.array('file'), function (req, res, next) {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})