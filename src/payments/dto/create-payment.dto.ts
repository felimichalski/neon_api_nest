type Item = {
  title: string;
  unit_price: number;
  quantity: number;
};

export class CreatePaymentDto {
  items: Item[];
  phone: number;
  address: string;
}
