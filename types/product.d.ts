export interface Product{
    id: string;
    title: string;
    brand: string;
    category: string;
    description: string;
    variants:Variant[];
    optionNames:string[];
    priceRange?:number[];
    totQuantity?:number;
    variantNumber?:number;
    allMedia?:string[];
  }

export interface Variant{
    price: number;
    quantity: number;
    media: string[];
    optionValues:string[]
    barcode: string;
}

export interface CompactProduct{
    title: string;
    brand: string;
    category: string;
    description: string;
    optionNames:string[];
    price: string;
    quantity: string;
    media: string;

  }