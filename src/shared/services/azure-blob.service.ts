import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { BusinessLogicException, BusinessError } from '../errors/business-errors';

@Injectable()
export class AzureBlobService {
  readonly azureConnection = process.env.AZURE_STORAGE_CONNECTION_STRING ;
  containerName :string;

  getBlobClient(imageName:string):BlockBlobClient{
    const blobClientService = BlobServiceClient.fromConnectionString(this.azureConnection);
    const containerClient = blobClientService.getContainerClient(this.containerName);
    const blobClient = containerClient.getBlockBlobClient(imageName);
    return blobClient;
  }

  async upload(file:Express.Multer.File,containerName:string,validationtype: string = null,validationsize: string = null){


    if(validationtype != null && validationtype!= file.mimetype){
      throw new BusinessLogicException(
        'bad extentionfile',
        BusinessError.BAD_REQUEST,
      );
    }else if(validationsize != null && parseFloat(validationsize) > file.size){
      throw new BusinessLogicException(
        'bad size file',
        BusinessError.BAD_REQUEST,
      );
    }else{
      this.containerName = containerName
      const imgUrl = uuidv4()+file.originalname;
      const blobClient = this.getBlobClient(imgUrl);
      await blobClient.uploadData(file.buffer);
      return (imgUrl);
    }
  }

  async getfile(fileName: string,containerName:string){
    this.containerName= containerName;
    const blobClient = this.getBlobClient(fileName);
    const blobDownloaded = await blobClient.download();
    return blobDownloaded.readableStreamBody;
  }

}