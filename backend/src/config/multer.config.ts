import { diskStorage } from 'multer';
import { extname } from 'path';
import {MulterOptions} from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import {existsSync,mkdirSync} from 'fs';
import {Request} from 'express'
import { v4 as uuid } from 'uuid';
export const multerOptions:MulterOptions = {
    limits: {
      fileSize: +process.env.MAX_FILE_SZE || 5242880,  // 5MB
    },
    fileFilter: (req:Request, file:Express.Multer.File, done:(error:Error,acceptFile:boolean)=>void) => {
      if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        done(null, true);
      } else {
        done(new HttpException(
            `Unsupported file type ${extname(file.originalname)}`,
            HttpStatus.BAD_REQUEST,
            ), false);
      }
      
    },
    storage: diskStorage({
        destination(req:Request, file:Express.Multer.File, done:(error:Error | null,acceptFile:string)=>void) {
            const uploadPath = process.env.Upload_TEMP_DIR
            
            if(!existsSync(uploadPath)){
                mkdirSync(uploadPath);
            }
            done(null, uploadPath);
        },
        filename(req:Request, file:Express.Multer.File, done:(error:Error | null,acceptFile:string)=>void) {
            const fileName = `${Date.now()}${extname(file.originalname)}`;
            done(null, generateFileName(file.originalname));
        },
    }),
};
  

function generateFileName(originalName:string):string{
    const fileExtension = extname(originalName);
    return `${uuid()}${fileExtension}`
}

