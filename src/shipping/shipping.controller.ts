import { Body, Controller, Post } from '@nestjs/common';
import { ShippingService } from './shipping.service';
import { QuoteShippingDTO } from './dto/quoteShippingDTO';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs';

@Controller('shipping')
export class ShippingController {
  constructor(
    private readonly shippingService: ShippingService,
    private readonly httpService: HttpService,
  ) {}

  @Post('quote')
  quoteShipping(@Body() quoteShippingDTO: QuoteShippingDTO) {
    const { province, postCode, accessToken } = quoteShippingDTO;
    return this.httpService
      .get(
        `https://api.enviopack.com/cotizar/costo?access_token=${accessToken}&provincia=${province}&codigo_postal=${postCode}&peso=1.5&correo=oca`,
      )
      .pipe(map((res) => res.data));
  }
}
