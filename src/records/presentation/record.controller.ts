import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { RecordService } from '../application/record.service';
import { CreateRecordDto, RecordResponseDto } from './record.dto';

@Controller('record')
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  @Get(':record_id')
  getRecordById(@Param('record_id') recordId: string): RecordResponseDto {
    return this.recordService.getRecordById(recordId);
  }

  @Get()
  getRecords(
    @Query('user_id') userId?: string,
    @Query('category_id') categoryId?: string,
  ): RecordResponseDto[] {
    return this.recordService.getRecords(userId, categoryId);
  }

  @Post()
  createRecord(
    @Body() { userId, categoryId, amount }: CreateRecordDto,
  ): RecordResponseDto {
    return this.recordService.createRecord(userId, categoryId, amount);
  }

  @Delete(':record_id')
  deleteRecord(@Param('record_id') recordId: string): void {
    return this.recordService.deleteRecord(recordId);
  }
}
