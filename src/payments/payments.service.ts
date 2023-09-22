import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as mercadopago from 'mercadopago';
import {
  CreatePreferencePayload,
  PreferenceItem,
} from 'mercadopago/models/preferences/create-payload.model';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto) {
    const preference: CreatePreferencePayload = {
      items: this.convertToPreferenceItems(createPaymentDto.products),
      back_urls: {
        success: `${process.env.FRONT_URL}/checkout/success`,
        failure: `${process.env.FRONT_URL}/checkout/failure`,
        pending: `${process.env.FRONT_URL}/checkout/pending`,
      },
      auto_return: 'approved',
    };

    try {
      await mercadopago.configure({
        access_token: process.env.MERCADOPAGO_ACCESS_TOKEN,
      });
      const response = await mercadopago.preferences.create(preference);
      // TODO: definir el objeto payment que es la instancia que se va a guardar en la db para tener trackeadas las ventas
      // const payment: Payment = {
      //   items: JSON.stringify(createPaymentDto.items),
      // }
      const temp = this.buildTempPayment(createPaymentDto);
      temp.preferenceId = response.body.id;
      const payment = await this.paymentRepository.create(temp);
      await this.paymentRepository.save(payment);
      return {
        id: response.body.id,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  convertToPreferenceItems(products: Product[]): PreferenceItem[] {
    const preferenceItems: PreferenceItem[] = [];

    for (const product of products) {
      const preferenceItem: PreferenceItem = {
        title: product.title,
        unit_price: product.unit_price,
        quantity: product.quantity,
      };
      preferenceItems.push(preferenceItem);
    }

    return preferenceItems;
  }

  buildTempPayment(createPaymentDto: CreatePaymentDto): Payment {
    return {
      client: createPaymentDto.client,
      products: JSON.stringify(createPaymentDto.products),
      shipping: createPaymentDto.shipping,
    };
  }
}
