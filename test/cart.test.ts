import { PricingRule, ProductCode } from '../src/types';

const ShoppingCart = require('../src/cart');

describe('Shopping Cart Tests', () => {
  let cart: typeof ShoppingCart;

  beforeEach(() => {
    const pricingRules = [
      PricingRule.UNLIMITED_1_GB_DEAL,
      PricingRule.UNLIMITED_5_GB_BULK_DISCOUNT,
      PricingRule.UNLIMITED_2_GB_BUNDLE,
      PricingRule.AMAYSIM_PROMOCODE,
    ];
    cart = new ShoppingCart(pricingRules);
  });

  test('Scenario 1: 3 for 2 deal on Unlimited 1 GB', () => {
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_LARGE,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$94.70');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 3,
      [ProductCode.ULT_LARGE]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('Scenario 2: with bulk discount for Unlimited 5 GB', () => {
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$209.40');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 2,
      [ProductCode.ULT_LARGE]: 4,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('Scenario 3: free 1 GB pack with every Unlimited 2 GB', () => {
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_MEDIUM,
      ProductCode.ULT_MEDIUM,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$84.70');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ULT_MEDIUM]: 2,
      [ProductCode.ONE_GB]: 2,
    };

    expect(Object.keys(cartItems).length).toBe(3);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('Scenario 4: with promo code', () => {
    cart.add(ProductCode.ULT_SMALL, 'I<3AMAYSIM');
    cart.add(ProductCode.ONE_GB);

    expect(cart.total).toBe('$31.32');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ONE_GB]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('Multiple 3 for 2 deals on Unlimited 1 GB', () => {
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_LARGE,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$169.40');
    // ((6 * discounted ult_small) + (1 * original ult_small)) + ult_large
    // (6 * 16.6) + (1 * 24.9) + 44.9
    // 124.5 + 44.9

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 7,
      [ProductCode.ULT_LARGE]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('With multiple promo codes', () => {
    cart.add(ProductCode.ULT_SMALL, 'I<3AMAYSIM');
    cart.add(ProductCode.ONE_GB, 'I<3AMAYSIM');

    expect(cart.total).toBe('$31.32'); // should only be discounted by the total not by product

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ONE_GB]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('With invalid promo code', () => {
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ONE_GB,
    ];
    items.forEach(item => {
      cart.add(item, 'i<3amaysim'); // promo code is case sensitive
    });

    expect(cart.total).toBe('$34.80'); // shows the total without any discount

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ONE_GB]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });
});

describe('Pricing Rules Tests', () => {
  test('No 3 for 2 deal', () => {
    const pricingRules = [
      PricingRule.UNLIMITED_5_GB_BULK_DISCOUNT,
      PricingRule.UNLIMITED_2_GB_BUNDLE,
      PricingRule.AMAYSIM_PROMOCODE,
    ];
    const cart = new ShoppingCart(pricingRules);
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_LARGE,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$119.60');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 3,
      [ProductCode.ULT_LARGE]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('No bulk discount for Unlimited 5 GB', () => {
    const pricingRules = [
      PricingRule.UNLIMITED_1_GB_DEAL,
      PricingRule.UNLIMITED_2_GB_BUNDLE,
    ];
    const cart = new ShoppingCart(pricingRules);
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_SMALL,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
      ProductCode.ULT_LARGE,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$229.40');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 2,
      [ProductCode.ULT_LARGE]: 4,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('No Unlimited 2 GB bundle', () => {
    const pricingRules = [
      PricingRule.UNLIMITED_5_GB_BULK_DISCOUNT,
    ];
    const cart = new ShoppingCart(pricingRules);
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ULT_MEDIUM,
      ProductCode.ULT_MEDIUM,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    expect(cart.total).toBe('$84.70');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ULT_MEDIUM]: 2,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('No promo codes', () => {
    const cart = new ShoppingCart();
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ONE_GB,
    ];
    items.forEach(item => {
      cart.add(item, 'I<3AMAYSIM');
    });

    expect(cart.total).toBe('$34.80');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ONE_GB]: 1,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });

  test('Unlimited 2 GB bundle rule enabled but with no unli 2 items in cart', () => {
    const cart = new ShoppingCart();
    const items = [
      ProductCode.ULT_SMALL,
      ProductCode.ONE_GB,
      ProductCode.ONE_GB,
      ProductCode.ONE_GB,
    ];
    items.forEach(item => {
      cart.add(item);
    });

    // expect that the 1 GB packs aren't free
    expect(cart.total).toBe('$54.60');

    const cartItems = cart.items;
    const expected = {
      [ProductCode.ULT_SMALL]: 1,
      [ProductCode.ONE_GB]: 3,
    };

    expect(Object.keys(cartItems).length).toBe(2);
    expect(cartItems).toEqual(expect.objectContaining(expected));
  });
});
