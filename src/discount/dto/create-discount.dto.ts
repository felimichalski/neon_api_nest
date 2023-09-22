export class CreateDiscountDto {
  code: string;
  value: number;
  type: string;
  reusable: boolean;
  max?: number;
}
