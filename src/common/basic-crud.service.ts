import { FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { DeepPartial } from 'typeorm/browser';

export class BasicCrudService<T> {
  constructor(protected readonly entityRepository: Repository<T>) {}

  async findAll(join?: FindOptionsRelations<T>): Promise<T[]> {
    return this.entityRepository.find({
      relations: join,
    });
  }

  async findOne(
    args: FindOptionsWhere<T>,
    join?: FindOptionsRelations<T>,
  ): Promise<T> {
    return this.entityRepository.findOne({
      where: args,
      relations: join,
    });
  }

  async findMany(
    args: FindOptionsWhere<T>,
    join?: FindOptionsRelations<T>,
  ): Promise<T[]> {
    return this.entityRepository.find({
      where: args,
      relations: join,
    });
  }

  async createOne(data: DeepPartial<T>): Promise<T> {
    const entity = this.entityRepository.create(data);

    return this.entityRepository.save(entity);
  }

  async updateOne(args: FindOptionsWhere<T>, data: Partial<T>): Promise<T> {
    const entity = await this.findOne(args);

    return this.entityRepository.save({
      ...entity,
      ...data,
    });
  }

  async deleteOne(args: FindOptionsWhere<T>): Promise<T> {
    const entity = await this.findOne(args);

    await this.entityRepository.delete(args);

    return entity;
  }
}
