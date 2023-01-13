import express from 'express';
import multer from 'multer';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PORT = 3001;

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());

app.post('/upload', upload.array('file'), async (req, res) => {
  if (req.files) {
    const ops = (req.files as Express.Multer.File[]).map( file => prisma.saves.create({
      data: {
        name: file.filename,
        originalName: file.originalname,
        path: file.path,
        userId: 1
      }
    }));
    await Promise.all(ops);
  }
  
  console.log(req.files);
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})