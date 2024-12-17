import { Injectable } from '@nestjs/common';
import { error } from 'console';
import * as tesseract from 'node-tesseract-ocr'

@Injectable()
export class OcrService {
    config = {
        lang: 'eng',
        oem: 1,
        psm: 4,
    };

    async parseImage(imageBuffer) {
        console.log(imageBuffer)
        console.log("--------------------------")
        return await tesseract.recognize(imageBuffer, this.config).then((text) => {
            return text.split("\r\n");
        }).catch((error) => {
            throw new Error(error)
        })
    }

}
