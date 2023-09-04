import { EntityRepository, Repository } from 'typeorm';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { FileEntity } from '@/entities/files.entity';
import { HttpException } from '@/exceptions/httpException';
import { BUCKET_NAME, BUCKET_REGION, ACCESS_KEY, SECRET_ACCESS_KEY } from '@/config';
import { Files } from '@/interfaces/files.interface';
import { UserEntity } from '@/entities/users.entity';
import { FolderEntity } from '@/entities/folder.entity';

const bucketName = BUCKET_NAME;
const region = BUCKET_REGION;
const accessKeyId = ACCESS_KEY;
const secretAccessKey = SECRET_ACCESS_KEY;

const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
  },
});

@EntityRepository()
export class FileService extends Repository<FileEntity> {
  public async uploadFile(file: Express.Multer.File, userId: number, folderId?: number): Promise<Files> {
    const fileStream = createReadStream(file.path);

    const folder = await FolderEntity.findOne(folderId);

    const user = await UserEntity.findOne(userId);
    if (!user) throw new HttpException(409, 'User does not exists');

    const uploadParams = {
      Bucket: bucketName,
      Key: file.filename,
      Body: fileStream,
      ContentType: file.mimetype,
    };

    try {
      const uploadCommand = new PutObjectCommand(uploadParams);
      await s3.send(uploadCommand);

      const createFile: Files = await FileEntity.create({
        ...file,
        file_name: file.filename,
        file_url: getFileUrl(file.filename),
        folder: { id: folder.id },
        user: { id: user.id },
      }).save();
      return createFile;
    } catch (error) {
      console.error('Error uploading file:', error.message);
      throw new HttpException(500, 'File upload failed.');
    }
  }
}

function getFileUrl(filename: string): string {
  return `https://${bucketName}.s3.amazonaws.com/${filename}`;
}
