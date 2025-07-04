import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Store } from '../../entities/store/store.entity';
import { CreateStoreDto } from '../../dtos/store/create-store.dto';
import { UpdateStoreDto } from '../../dtos/store/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
    private readonly dataSource: DataSource,
  ) {}

  async getNextStoreNumber(): Promise<string> {
    // Fetch the latest store sorted by number in descending order and limit to 1 record
    const [latestCategory] = await this.storesRepository.find({
      order: { number: 'DESC' },
      select: ['number'],
      take: 1,
    });

    if (latestCategory) {
      const lastNumber = latestCategory.number.slice(4);
      const nextNumber = (parseInt(lastNumber) + 1).toString().padStart(4, '0');
      return `STO-${nextNumber}`;
    }
    return 'STO-0001';
  }

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    //Save Store
    createStoreDto.number = await this.getNextStoreNumber();
    const store = this.storesRepository.create(createStoreDto);
    return await this.storesRepository.save(store);
  }

  //for fetching all stores
  async findAll(): Promise<Store[]> {
    return await this.storesRepository.find({
      relations: ['storeProducts'], // if you want to include related storeProducts
    });
  }

  async findOne(id: string): Promise<Store> {
    const store = await this.storesRepository.findOne({
      where: { uuid: id },
      relations: ['storeProducts'], // include relations if needed
    });

    if (!store) {
      throw new NotFoundException(`Store with id ${id} not found`);
    }
    return store;
  }

  /**
   * @param {UpdateStoreDto} updateStoreDto - DTO containing updated store details.
   * @param {string} uuid - The UUID of the store to update.
   * @return {Promise<Store>} - The updated store.
   * @throws {NotFoundException} - If the store is not found.
   */
  async update(updateStoreDto: UpdateStoreDto, uuid: string): Promise<Store> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager) => {
        const store = await entityManager.findOne(Store, {
          where: { uuid },
        });

        if (!store) {
          throw new NotFoundException(`store with ID: ${uuid} not found.`);
        }

        // Ensure unique item name only if a new name is provided
        if (updateStoreDto.name) {
          const existingStore = await entityManager.findOneBy(Store, {
            name: updateStoreDto.name,
          });

          if (existingStore && existingStore.uuid !== uuid) {
            throw new BadRequestException(
              `Store with name '${updateStoreDto.name}' already exists.`,
            );
          }
        }

        // Update other item properties
        Object.assign(store, updateStoreDto);
        return entityManager.save(Store, store);
      },
    );
  }
}
