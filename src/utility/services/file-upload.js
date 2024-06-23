import { BaseService } from './base'
import { APIPath } from 'utility'

class FileUpload {
    signedUrl(params) {
        return BaseService.post(APIPath.getSignedURL, params)
    }

    media(url, file, contentType) {
        const header = {
            'Content-type': contentType,
        }
        return BaseService.upload(url, file, header)
    }
}

const FileUploadService = new FileUpload()
Object.freeze(FileUploadService)
export { FileUploadService }
