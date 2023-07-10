import { Cart, PricingRule, Product, ProductCode, ProductName } from './types';

const products: ReadonlyArray<Product> = [
  {
    productCode: ProductCode.ULT_SMALL,
    productName: ProductName.UNLIMITED_1_GB,
    price: 24.90,
  },
  {
    productCode: ProductCode.ULT_MEDIUM,
    productName: ProductName.UNLIMITED_2_GB,
    price: 29.90,
  },
  {
    productCode: ProductCode.ULT_LARGE,
    productName: ProductName.UNLIMITED_5_GB,
    price: 44.90,
  },
  {
    productCode: ProductCode.ONE_GB,
    productName: ProductName.ONE_GB_DATA_PACK,
    price: 9.90,
  },
];

class ShoppingCart {
  rules: ReadonlyArray<PricingRule>;
  cart: Cart = {};
  promoCode: string = '';

  constructor(rules: ReadonlyArray<PricingRule> = []) {
    this.rules = rules;
  }

  getProduct(productCode: string): Product {
    const product = products.find(p => p.productCode === productCode);

    if (!product) throw Error('Invalid product code');

    return product;
  }

  add(productCode: ProductCode, promoCode?: string) {
    if (productCode in this.cart) {
      const quantity = this.cart[productCode] ?? 0; // TODO: hack for possibly 'undefined' error
      this.cart[productCode] = quantity + 1;
    } else {
      this.cart[productCode] = 1;
    }

    if (this.isRuleEnabled(PricingRule.UNLIMITED_2_GB_BUNDLE) && productCode === ProductCode.ULT_MEDIUM) {
      this.add(ProductCode.ONE_GB);
    }

    if (promoCode) {
      this.promoCode = promoCode;
    }
  }

  get total() {
    let cost = Object.entries(this.cart).reduce((prev, [productCode, quantity]) => {
      let totalCost = 0;
      const { price } = this.getProduct(productCode);

      if (
        this.isRuleEnabled(PricingRule.UNLIMITED_1_GB_DEAL)
        && productCode === ProductCode.ULT_SMALL
        && quantity >= 3
      ) {
        const bulkPrice = price * 2/3;
        const notDiscountedQuantity = quantity % 3;
        totalCost = price * notDiscountedQuantity + (bulkPrice * (quantity - notDiscountedQuantity));
      } else if (
        this.isRuleEnabled(PricingRule.UNLIMITED_5_GB_BULK_DISCOUNT)
        && productCode === ProductCode.ULT_LARGE
        && quantity > 3
      ) {
        totalCost = 39.90 * quantity;
      } else if (this.isRuleEnabled(PricingRule.UNLIMITED_2_GB_BUNDLE) && productCode === ProductCode.ONE_GB && ProductCode.ULT_MEDIUM in this.cart) {
        const unliTwoGbQuantity = this.cart[ProductCode.ULT_MEDIUM] ?? 0; // TODO: this a hack
        totalCost = price * (quantity - unliTwoGbQuantity);
      } else {
        totalCost = price * quantity;
      }


      return prev + totalCost;
    }, 0);

    if (
      this.isRuleEnabled(PricingRule.AMAYSIM_PROMOCODE)
      && this.promoCode === PricingRule.AMAYSIM_PROMOCODE
    ) {
      cost *= 0.9;
    }

    return `$${cost.toFixed(2)}`;
  }

  get items() {
    return this.cart;
  }

  isRuleEnabled(rule: PricingRule): boolean {
    return this.rules.includes(rule);
  }
}

// -------------

// const testScenario = (items: ReadonlyArray<ProductCode>, promoCode?: string) => {
//   const pricingRules = [
//     PricingRule.UNLIMITED_1_GB_DEAL,
//     PricingRule.UNLIMITED_5_GB_BULK_DISCOUNT,
//     PricingRule.UNLIMITED_2_GB_BUNDLE,
//     PricingRule.AMAYSIM_PROMOCODE,
//   ];
//   const myCart = new ShoppingCart(pricingRules);

//   items.forEach(item => {
//     myCart.add(item, promoCode);
//   });

//   console.log('cart total: ', myCart.total);
//   console.log('cart items: ', myCart.items);
// };

// testScenario([
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_LARGE,
// ]);

// testScenario([
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_LARGE,
//   ProductCode.ULT_LARGE,
//   ProductCode.ULT_LARGE,
//   ProductCode.ULT_LARGE,
// ]);

// testScenario([
//   ProductCode.ULT_SMALL,
//   ProductCode.ULT_MEDIUM,
//   ProductCode.ULT_MEDIUM,
// ]);

// testScenario([
//   ProductCode.ULT_SMALL,
//   ProductCode.ONE_GB,
// ], 'I<3AMAYSIM');

module.exports = ShoppingCart;
