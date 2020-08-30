import { celsiusToFahrenheit } from '../celtofar';


describe("Testing the celsiusToFahrenheit functionality", () => {


  test("Testing the celsiusToFahrenheit() function", () => {

    expect(celsiusToFahrenheit(0)).toBe(32);

    })
});
