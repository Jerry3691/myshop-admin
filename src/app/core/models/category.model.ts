export interface Category {
  id?: number;
  name?: string;
  parent_id?: number|string|null;
  parent_name?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
}
export interface ModifiedCategoryList {
  id?: number;
  name?: string;
  parent_id?: number|string|null;
  parent_name?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;
  children?:ModifiedCategoryList[]|null;
}

export class CategoryModel {
  id?: number;
  name?: string;
  parent_id?: number|string|null;
  parent_name?: string;
  status?: number;
  created_at?: Date;
  updated_at?: Date;

  constructor(category: Partial<Category>) {
    if (category) {
      this.id = category.id;
      this.name = category.name;
      this.parent_id = category.parent_id;
      this.parent_name = category.parent_name;
      this.status = category.status;
      this.created_at = category.created_at;
      this.updated_at = category.updated_at;
    }
  }
}
