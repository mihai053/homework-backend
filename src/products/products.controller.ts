import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async addProduct(
    @Body('name') prodName: string,
    @Body('code') prodCode: string,
    @Body('weight') prodWeight: number,
    @Body('color') prodColor: string,
    @Body('price') prodPrice: number,
  ) {
    const generatedId = await this.productsService.insertProduct(
      prodName,
      prodCode,
      prodWeight,
      prodColor,
      prodPrice,
      false,
    );
    return { id: generatedId, message: 'Produsul a fost adaugat cu succes!' };
  }

  @Get()
  async getAllProducts() {
    const products = await this.productsService.getProducts();
    return products;
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('name') prodName: string,
    @Body('code') prodCode: string,
    @Body('weight') prodWeight: number,
    @Body('color') prodColor: string,
    @Body('price') prodPrice: number,
  ) {
    await this.productsService.updateProduct(
      prodId,
      prodName,
      prodCode,
      prodWeight,
      prodColor,
      prodPrice,
    );
    return { message: 'Produsul a fost modificat cu succes!' };
  }

  @Delete(':id')
  async removeProduct(@Param('id') productId: string) {
    await this.productsService.deleteProduct(productId);
    return { message: 'Produsul a fost sters cu succes!' };
  }
}
