import { Injectable, NestMiddleware } from '@nestjs/common';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

@Injectable()
export class FileUploadMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const upload = multer({ storage });
    upload.single('file')(req, res, next);
  }
}
