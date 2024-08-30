export interface ImagesUrl {
  id: string | number;
  product_id: number | string;
  url: string;
  creaed_at: Date;
  updated_at: string;
}
export interface options {
  created_at: Date;
  id: number;
  option_group_id: number;
  option_group_name: string;
  option_id: number;
  option_name: string;
  option_price_increment: number;
  product_id: number;
}

export interface Product {
  id: string | number;
  name: string;
  short_description: string;
  long_description: string;
  quantity: string;
  category: number | string;
  price: number | string;
  availability: number;
  options: Array<options>;
  dimensions: string;
  care_instructions: string;
  status: number;
  created_at: Date;
  updated_at: string;
  material: string;
  category_name: string;
  images_url: ImagesUrl[];
  categories:Array<any>,
  product_order:number,
}


export class ProductModel {
  id: number | string;
  name: string;
  short_description: string;
  long_description: string;
  quantity: string;
  category: number | string;
  price: number | string;
  availability: number;
  options: Array<options>;
  dimensions: string;
  care_instructions: string;
  material: string;
  category_name: string;
  images_url: ImagesUrl[];
  categories:Array<any>

  constructor(product: Partial<Product>) {
    if (product) {
      this.id = product.id;
      this.name = product.name;
      this.short_description = product.short_description != 'null' ? product.short_description : '';
      this.long_description = product.long_description != 'null' ? product.long_description : '';
      this.quantity = product.quantity != 'null' ? product.quantity : '';
      this.category = product.category;
      this.price = product.price != 'null' ? product.price : '';
      this.availability = product.availability;
      this.options = product.options;
      this.dimensions = product.dimensions != 'null' ? product.dimensions : '';
      this.care_instructions = product.care_instructions != 'null' ? product.care_instructions : '';
      this.material = product.material != 'null' ? product.material : '';
      this.category_name = product.category_name;
      this.images_url = product.images_url;
      this.categories=product.categories
    }
  }
}
