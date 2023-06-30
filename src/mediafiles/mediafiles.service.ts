import { Injectable, UploadedFiles, HttpException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Mediafile } from './entities/mediafile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MediafilesService {
  constructor(
    @InjectRepository(Mediafile)
    private readonly mediafileRepository: Repository<Mediafile>,
  ) {}
  private readonly s3Client: S3Client = new S3Client({
    region: process.env.AWS_S3_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  create(createMediafileDto) {
    const mediafile = this.mediafileRepository.create(createMediafileDto);
    try {
      return this.mediafileRepository.save(mediafile);
    } catch (error) {
      console.error(error);
    }
  }

  async upload(@UploadedFiles() files: Array<Express.Multer.File>) {
    const objectKeys = [];
    for (const file of files) {
      const newObjectKey = `${uuidv4()}.${file.originalname.split('.').pop()}`;
      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKETNAME,
        Key: `${process.env.AWS_S3_FOLDERNAME}/${newObjectKey}`,
        Body: file.buffer,
      });
      try {
        await this.s3Client.send(command);
        objectKeys.push({ key: newObjectKey });
      } catch (error) {
        console.log(error);
        throw new HttpException(error, 500);
      }
    }
    return objectKeys;
  }

  async get(objectKey: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKETNAME,
      Key: `${process.env.AWS_S3_FOLDERNAME}/${objectKey}`,
    });
    try {
      return await this.s3Client.send(command);
    } catch (error) {
      if (error.Code !== 'AccessDenied') {
        console.log(error);
      }
    }
  }

  async delete(objectKey: string) {
    const command = new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKETNAME,
      Key: `${process.env.AWS_S3_FOLDERNAME}/${objectKey}`,
    });
    try {
      return await await this.s3Client.send(command);
    } catch (error) {
      if (error.Code !== 'AccessDenied') {
        console.log(error);
      }
    }
  }
}
