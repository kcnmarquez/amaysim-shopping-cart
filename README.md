# Amaysim Shopping Cart

This is a simple Node exercise that allows a user to purchase multiple SIM cards simultaneously.

## Technologies/libraries used

- node
- typescript
- jest (for testing)

## Set up

Run `npm install` to install the necessary packages.

## Development

The code can be seen in `src/cart.ts`. We're using typescript so you need to run `tsc` to compile your typescript into javascript. The javascript code can then be seen inside `dist/` which is the specified `outDir` (output directory) in our `tsconfig.json`. To execute the final js code, simply run `node dist/src/cart.js`.

## Manual testing

1. In `cart.ts`, comment out the `testScenario` function and the desired `testScenario([...])` call/s.
2. Run `tsc; node dist/src/cart.js` in your terminal.
3. Check that the result is as expected. 

## Unit testing

You can run `npm run test` to run all tests with coverage report. You can then see the coverage report by opening `path/to/amaysim-shopping-cart/coverage/lcov-report/cart.ts.html` in the browser.

Here's a sample output of `npm run test`:
```lang=bash

> amaysim-shopping-cart@1.0.0 test
> jest --coverage

 PASS  test/cart.test.ts
  Shopping Cart Tests
    ✓ Scenario 1: 3 for 2 deal on Unlimited 1 GB (2 ms)
    ✓ Scenario 2: with bulk discount for Unlimited 5 GB
    ✓ Scenario 3: free 1 GB pack with every Unlimited 2 GB
    ✓ Scenario 4: with promo code (1 ms)
    ✓ Multiple 3 for 2 deals on Unlimited 1 GB (1 ms)
    ✓ With multiple promo codes
    ✓ With invalid promo code
  Pricing Rules Tests
    ✓ No 3 for 2 deal (1 ms)
    ✓ No bulk discount for Unlimited 5 GB (1 ms)
    ✓ No Unlimited 2 GB bundle (1 ms)
    ✓ No promo codes (1 ms)
    ✓ Unlimited 2 GB bundle rule enabled but with no unli 2 items in cart (1 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |   98.11 |     92.5 |     100 |     100 |                   
 cart.ts  |   97.36 |    91.17 |     100 |     100 | 38,45,80          
 types.ts |     100 |      100 |     100 |     100 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       12 passed, 12 total
Snapshots:   0 total
Time:        1.23 s, estimated 2 s
Ran all test suites.
```

### Debugging

For development, you can run `npm run test:watch` so that it'll rerun the tests each time the code changes.

Some useful tips for debugging the tests:
- to exclude running a scenario, you can use `test.skip` or `xdescribe`
- to run just one specific scenario, you can use `test.only` or `fdescribe`
