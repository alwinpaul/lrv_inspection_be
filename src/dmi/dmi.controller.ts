import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DmiService } from './dmi.service';
import { SaveFormDTO } from './dmi.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('dmi')
export class DmiController {
  constructor(private readonly dmiService: DmiService) { }

  @UseGuards(AuthGuard)
  @Post('save')
  async saveForm(@Body() saveData: SaveFormDTO) {
    return this.dmiService.saveDmiData(saveData)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAll() {
    return this.dmiService.getAllDmis()
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getById(@Param('id') id: string) {
    return this.dmiService.getById(id)
  }

}
