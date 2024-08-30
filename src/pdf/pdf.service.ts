import { HttpException, HttpStatus, Injectable, ServiceUnavailableException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as path from 'path';
import * as pug from 'pug';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PdfService {

    constructor(
        private configService: ConfigService
    ) { }

    awsConfig = {
        accessKeyId: this.configService.get<string>('ACCESS_KEY_AWS'),
        secretAccessKey: this.configService.get<string>('SECRET_KEY_AWS'),
        region: this.configService.get<string>('AWS_REGION'),
    }
    s3 = new S3Client(this.awsConfig)

    async compile<T>(templateName: string, data: T) {
        try {
            const filePath = path.join(process.cwd(), './src/templates', `${templateName}.pug`)
            const compiledFunction = pug.compileFile(filePath);
            return compiledFunction(data);
        }
        catch (err) {
            console.log(err)
            throw new ServiceUnavailableException()
        }

    }

    async generatepdf<T>(data: T, fileName: string, template: string) {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        const content = await this.compile(template, data)
        await page.setContent(content)
        await page.emulateMediaType('screen')
        const pdf = await page.pdf({
            path: 'dmifile.pdf',
            format: 'A4',
            printBackground: true
        })
        await browser.close()
        const pdfPath = await this.uploadToS3(fileName, pdf)
        return pdfPath
    }

    async uploadToS3(filename: string, pdf: any) {
        const bucket = this.configService.get<string>('BUCKET_NAME')
        const key = `pdf/${filename}`

        const s3Params = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: pdf,
            ContentType: 'application/pdf',
            ServerSideEncryption: 'AES256'
        })

        const [res, region] = await Promise.all([
            this.s3.send(s3Params),
            this.s3.config.region(),
        ]);

        const url = `https://${bucket}.s3.${region}.amazonaws.com/${key}`
        console.log(url)
        return new Promise((resolve) => {
            resolve(url)
        })
    }
}
