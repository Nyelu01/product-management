import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  UsePipes,
  ParseUUIDPipe,
  Controller,
} from '@nestjs/common';
import { StoreService } from '../../services/store/store.service';
import { CreateStoreDto } from '../../dtos/store/create-store.dto';
import { UpdateStoreDto } from '../../dtos/store/update-store.dto';
import { Store } from '../../entities/store/store.entity';

@Controller('stores')
export class StoreController {
  constructor(private readonly storesService: StoreService) {}

  @Post()
  @UsePipes(CreateStoreDto)
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.create(createStoreDto);
  }

  @Get()
  async findAll(): Promise<Store[]> {
    return await this.storesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.storesService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(UpdateStoreDto)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateStoreDto: UpdateStoreDto,
  ) {
    return await this.storesService.update(updateStoreDto, id);
  }
}
