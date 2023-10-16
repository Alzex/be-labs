import { Injectable } from '@nestjs/common';
import { LocalCrudService } from '../common/local-crud.service';
import { Category } from './models/category.model';

@Injectable()
export class CategoryService extends LocalCrudService<Category> {
  constructor() {
    super(Category);
  }
}
