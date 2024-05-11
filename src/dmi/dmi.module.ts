import { Module } from '@nestjs/common';
import { DmiService } from './dmi.service';
import { DmiController } from './dmi.controller';
import { DmiSchema } from './dmi.model';
import { MongooseModule } from '@nestjs/mongoose';
import { PdfService } from 'src/pdf/pdf.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'DMI', schema: DmiSchema }])],
  controllers: [DmiController],
  providers: [DmiService, PdfService],
})
export class DmiModule {}
