import { Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { S3Service } from '@softvence/s3';

@Controller()
export class AppController {
  constructor(private readonly s3Service: S3Service) {}

  @Post("single")
  @UseInterceptors(FileInterceptor("file"))
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    const result = await this.s3Service.uploadFile(file);
    return result;
  }

  @Post("multiple")
  @UseInterceptors(FilesInterceptor("files", 10))
  async uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    const results = await this.s3Service.uploadFiles(files);
    return results;
  }

}
