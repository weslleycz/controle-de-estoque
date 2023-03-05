import {
  Body,
  Controller,
  Delete,
  Get,
  Params,
  Post,
  Response,
} from '@decorators/express';
import { makeValidateBody } from 'express-class-validator';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../../database/store';
import { createProduct } from './Product.dto';

@Controller('/products')
export class Product {
  @Post('', [makeValidateBody(createProduct)])
  public create(@Response() res, @Body() body: createProduct) {
    const id = uuidv4();
    const { code_bar, name, price, quantity } = body;

    store.set({ [`products.${id}`]: { id, code_bar, name, price, quantity } });
    return res.status(200).json({ status: 'created' });
  }

  @Get('')
  public async findAll(@Response() res) {
    const data = store.get('products') as {};
    const products = Object.entries(data).map((product) => product[1]);
    return res.status(200).json({ data: products });
  }

  @Delete('/:id')
  public async delete(@Params('id') id: string, @Response() res) {
    const product = store.get(`products.${id}`);
    if (!product) {
      return res.status(400).json({ status: 'product not found' });
    } else {
      store.delete(`products.${id}`);
      return res.status(200).json({ status: 'delete' });
    }
  }
}
