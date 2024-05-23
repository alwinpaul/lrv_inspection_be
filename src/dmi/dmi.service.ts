import { Injectable } from '@nestjs/common';
import { toZonedTime } from "date-fns-tz";
import { SaveFormDTO } from './dmi.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PdfService } from 'src/pdf/pdf.service';


@Injectable()
export class DmiService {

    constructor(
        @InjectModel('DMI') private readonly dmiModel: Model<SaveFormDTO>,
        private pdfService: PdfService) { }

    async saveDmiData(data: SaveFormDTO) {
        const date = new Date(data.dateTime)
        const timeZone = "America/Toronto";
        const zonedDate = toZonedTime(date, timeZone);
        const pdfFormatData = {
            ...data, dateTime: zonedDate.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            })
        }
        const pdfPath = await this.pdfService.generatepdf(pdfFormatData, `/dmi-${data.vehicleInfo.vehicle_id}-${Date.now()}.pdf`, 'dmi')
        const newData = { ...data, pdf: pdfPath }
        const newDmiData = new this.dmiModel(newData)
        const result = await newDmiData.save()
        return result
    }

    async getAllDmis() {
        const result = await this.dmiModel.find().sort('-dateTime')
        return result
    }

    async getById(id: string) {
        const result = await this.dmiModel.findById(id)
        return result
    }

}
