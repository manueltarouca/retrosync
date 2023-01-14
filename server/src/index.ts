import express from 'express';
import multer from 'multer';
import cors from 'cors'
import { PrismaClient } from '@prisma/client';
import { FileData } from './models';

const prisma = new PrismaClient();

const PORT = 3001;

const upload = multer({ dest: 'uploads/' });

const app = express();

app.use(cors());

app.post('/upload', upload.array('file'), async (req, res) => {
  if (req.files && req.body.filedata) {
    const fileData: FileData[] = req.body.filedata.map((item: string) => JSON.parse(item));
    const ops = (req.files as Express.Multer.File[]).map(file => {
      const current = fileData.find(item => item.name === file.originalname);
      return prisma.saves.create({
        data: {
          name: file.filename,
          originalName: file.originalname,
          path: file.path,
          originalPath: current?.path,
          userId: 1
        }
      });
    });
    console.log(`to insert ${ops.length} items`)
    await Promise.all(ops);
  }
});

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`);
})