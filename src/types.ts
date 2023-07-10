export interface Product {
  productCode: ProductCode;
  productName: ProductName;
  price: number; // in dollars
}

export type Cart = {
  [key in ProductCode]?: number;
};

export enum ProductCode {
  ULT_SMALL = 'ult_small',
  ULT_MEDIUM = 'ult_medium',
  ULT_LARGE = 'ult_large',
  ONE_GB = '1gb',
}

export enum ProductName {
  UNLIMITED_1_GB = 'Unlimited 1GB',
  UNLIMITED_2_GB = 'Unlimited 2GB',
  UNLIMITED_5_GB = 'Unlimited 5GB',
  ONE_GB_DATA_PACK = '1 GB Data-pack',
}

export enum PricingRule {
  UNLIMITED_1_GB_DEAL = '3 for 2 deal',
  UNLIMITED_5_GB_BULK_DISCOUNT = 'bulk discount',
  UNLIMITED_2_GB_BUNDLE = 'bundle',
  AMAYSIM_PROMOCODE = 'I<3AMAYSIM',
}
