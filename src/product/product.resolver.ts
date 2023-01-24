import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddProductArgs } from './args/product.args';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
    constructor(private readonly productService: ProductService){}

    @Query(returns => [Product])
    getAllProducts(){
        return this.productService.getAllProducts() 
    }

    @Mutation(returns => String)
    createProduct(@Args({name:"addProductArgs"})addProductArgs: AddProductArgs){
        return this.productService.createProduct(addProductArgs)
    }

}
