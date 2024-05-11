import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as path from 'path';
import * as pug from 'pug';

@Injectable()
export class PdfService {

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
        await page.pdf({
            path: path.join(process.cwd(), './dist/pdf', `${fileName}.pdf`),
            format: 'A4',
            printBackground: true
        })
        await browser.close()

    }
}
