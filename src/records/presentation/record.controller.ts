import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { RecordService } from '../application/record.service';
import {
  CreateRecordDto,
  UpdateRecordDto,
  RecordResponseDto,
} from './record.dto';
import { JwtAuthGuard } from '../../auth/infrastructure/jwt-auth.guard';

@Controller('record')
@UseGuards(JwtAuthGuard)
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get(':record_id')
  async getRecordById(
    @Param('record_id') recordId: string,
  ): Promise<RecordResponseDto> {
    return this.recordService.getRecordById(recordId);
  }

  @Get()
  async getRecords(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ): Promise<RecordResponseDto[]> {
    return this.recordService.getRecords(userId, categoryId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createRecord(@Body() dto: CreateRecordDto): Promise<RecordResponseDto> {
    return this.recordService.createRecord(dto);
  }

  @Put(':record_id')
  async updateRecord(
    @Param('record_id') recordId: string,
    @Body() dto: UpdateRecordDto,
  ): Promise<RecordResponseDto> {
    return this.recordService.updateRecord(recordId, dto);
  }

  @Delete(':record_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteRecord(@Param('record_id') recordId: string): Promise<void> {
    await this.recordService.deleteRecord(recordId);
  }
}
