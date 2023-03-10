import { Body, Controller, Post, Response } from '@decorators/express';
import { Response as IResponse } from 'express';
import { makeValidateBody } from 'express-class-validator';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../../database/store';
import { createSaleDTO, IProduct } from './Sales.dto';


@Controller('/sales')
export class Sales {
  @Post('', [makeValidateBody(createSaleDTO)])
  public async create(@Response() res: IResponse, @Body() body: createSaleDTO) {
    const { products,money } = body;
    const total = products.reduce((valor, product) => {
      const { id, quantity } = product;
      const productBD = <IProduct>store.get(`products.${id}`);
      return valor + productBD.price * quantity;
    }, 0);
    if (total === 0) {
      return res.status(400).json({ status: 'products not found' });
    } else if (money < total){
      return res.status(200).json({ status: 'money is not enough' });
    } else {
      const id = uuidv4();
      store.set({
        [`sales.${id}`]: { id, products, total, data: moment() },
      });
      return res.status(200).json({ status: 'created' });
    }
  }
}
