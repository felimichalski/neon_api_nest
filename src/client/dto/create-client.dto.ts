export class CreateClientDto {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dni: string;
  address?: string;
  province?: string;
  postCode?: string;
}
