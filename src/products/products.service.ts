import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Product } from './product.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>, //inject mongoose model
  ) {}

  async insertProduct(
    name: string,
    code: string,
    weight: number,
    color: string,
    price: number,
    isDeleted: boolean,
  ) {
    const newProduct = new this.productModel({
      name,
      code,
      weight,
      color,
      price,
      isDeleted,
    });
    const result = await newProduct.save();
    return result.id as string; //type casting
  }

  async getProducts() {
    const products = await this.productModel.find().exec(); //find is not a real promise
    return products
      .filter((product) => product.isDeleted === false)
      .map((product) => ({
        //transform the data
        id: product.id,
        name: product.name,
        code: product.code,
        weight: product.weight,
        color: product.color,
        price: product.price,
        isDeleted: product.isDeleted,
      }));
  }

  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId);
    return {
      id: product.id,
      name: product.name,
      code: product.code,
      weight: product.weight,
      color: product.color,
      price: product.price,
      isDeleted: product.isDeleted,
    };
  }

  async updateProduct(
    productId: string,
    name: string,
    code: string,
    weight: number,
    color: string,
    price: number,
  ) {
    const updatedProduct = await this.findProduct(productId);
    if (name) {
      updatedProduct.name = name;
    }
    if (code) {
      updatedProduct.code = code;
    }
    if (weight) {
      updatedProduct.weight = weight;
    }
    if (color) {
      updatedProduct.color = color;
    }
    if (price) {
      updatedProduct.price = price;
    }
    await updatedProduct.save();
  }

  async deleteProduct(productId: string) {
    const foundProduct = await this.findProduct(productId);
    foundProduct.isDeleted = true;
    await foundProduct.save();
  }

  private async findProduct(id: string): Promise<Product> {
    let product: any;
    try {
      product = await this.productModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product!');
    }
    if (!product) {
      throw new NotFoundException('Could not find product!');
    }
    return product;
  }
}
