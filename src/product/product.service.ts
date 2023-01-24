import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddProductArgs } from './args/product.args';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product) private productRepo:typeof Product){}

    async getAllProducts(): Promise<Product[]> {
        return await this.productRepo.findAll()
    }

    async createProduct(addproductArgs: AddProductArgs): Promise<string> {
        let product : Product = new Product();
        product.name = addproductArgs.name;
        product.price = addproductArgs.price;
        product.discription = addproductArgs.discription;
        await product.save();
        return 'Product has been added successfully';
    }

}
