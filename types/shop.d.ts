export interface Shop{
    name: string;
    description: string;
    media:string[];
    address:Address
  }

  export interface Address{
    street: string;
    number: string;
    city: string;
    province: string;
    state: string;
  }