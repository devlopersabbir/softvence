import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3Service } from '@softvence/s3';

@Controller()
export class AppController {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const res = await this.s3Service.uploadFile(file);
    console.log(res.url);
    console.log(res.size);
    console.log(res.originalName);
    return {
      ...res,
    };
  }

  @Post("multiple")
  @UseInterceptors(FilesInterceptor("files", 10))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    const results = await this.s3Service.uploadFiles(files);
    return results;
  }

}
