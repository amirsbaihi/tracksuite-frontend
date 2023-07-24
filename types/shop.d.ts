export interface Shop{
    name: string;
    description: string;
    media:string[];
    address:Address;
    productCount: number; 
    id: string;
  }

  export interface Address{
    street: string;
    number: string;
    city: string;
    province: string;
    state: string;
  }