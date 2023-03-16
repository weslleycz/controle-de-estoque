import { Body, Controller, Get, Post, Response } from '@decorators/express';
import { Response as IResponse } from 'express';
import { makeValidateBody } from 'express-class-validator';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../../database/store';
import { createSaleDTO } from './Sales.dto';

export type IProduct = {
  id: string;
  code_bar: string;
  name: string;
  price: number;
  quantity: number;
};

@Controller('/sales')
export class Sales {
  @Post('', [makeValidateBody(createSaleDTO)])
  public async create(@Response() res: IResponse, @Body() body: createSaleDTO) {
    const { products, money } = body;
    if (money === 0) {
      return res.status(400).json({ status: 'products not found' });
    } else {
      const id = uuidv4();
      products.map(async (product) => {
        const productBD = <IProduct>await store.get(`sales.${id}`);
        const total = productBD.quantity - product.quantity;
        store.set({ [`products.${id}.quantity`]: total });
      });
      store.set({
        [`sales.${id}`]: { id, products, total: money, data: moment() },
      });
      return res.status(200).json({ status: 'created' });
    }
  }
}
