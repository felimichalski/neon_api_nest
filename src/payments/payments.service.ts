import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import * as mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { User } from 'src/users/entities/user.entity';
import { Payment } from './entities/payment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto, user: User) {
    const preference: CreatePreferencePayload = {
      items: createPaymentDto.items,
      back_urls: {
        success: 'http://localhost:3000/checkout/success',
        failure: 'http://localhost:3000/checkout/failure',
        pending: 'http://localhost:3000/checkout/pending',
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
      // await this.paymentRepository.create(payment)
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
}
