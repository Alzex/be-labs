import { NotFoundException } from '@nestjs/common';
import { ClassConstructor } from 'class-transformer';

export class LocalCrudService<Model extends { id: number }> {
  private readonly models: Map<number, Model> = new Map();

  constructor(private model: ClassConstructor<Model>) {}

  createOne(data: Partial<Model>): Model {
    const id = this.models.size + 1;
    const model = { ...data, id } as Model;
    this.models.set(id, model);
    return model;
  }

  findMany(args: Partial<Model>): Model[] {
    return this.findAll().filter((model) => {
      return Object.keys(args).every((key) => {
        return args[key] === model[key];
      });
    });
  }

  findOneById(id: number): Model {
    return this.models.get(id);
  }

  findOneByIdOrFail(id: number): Model {
    const model = this.findOneById(id);

    if (!model) {
      throw new NotFoundException(`${this.model.name} with id ${id} not found`);
    }

    return model;
  }

  findOne(args: Partial<Model>): Model {
    return this.findMany(args)[0];
  }

  findAll(): Model[] {
    return Array.from(this.models.values());
  }

  deleteOneById(id: number): Model {
    const model = this.models.get(id);

    if (!model) {
      throw new NotFoundException(
        `${this.model.name} model with id ${id} not found`,
      );
    }

    this.models.delete(id);
    return model;
  }
}
