package Interfaces

uses Classes.Policy


/**
 * Created by eranoazana on 2/12/2016.
 */
interface IPricingEngine {

    /**
     * This method will generate a price for the policy using the following logic:
     * 1: Calculate a price for each car on the policy as follows:
     *    a: if the Car's make is "Mercedes", then the price is 1.5 percent of its price.
     *    b: If it is not a "Mercedes" then the price is 1.0 percent of its price.
     * 2: If a car is older than 5 years, decrease the price by 0.5%
     * 3: Add the annual prices for each coverage on each car. (Use each coverage's getBaseRate() method)
     * 4: Add all the prices for all the cars as a sub-total
     * 5: For each driver on the policy, add a $125.00 charge
     * 6: add it all up into one total price
     * 7: Create a PolicyPriceQuote and make sure it has the right PolicyNumber for the policy as well as the detailed
     *    price breakdown - The PriceBreakDown is a Map of the subtotal for all instances of each coverageType
     *    on the Policy
     * 8: return the PolicyPriceQuote (the downPayment is 25% of the total price)
     * @param aPolicy : Policy to be priced
     * @return The calculated Policy price quote for the policy passed as a parameter
     */

    public function pricePolicy(aPolicy : Policy) : IPolicyPriceQuote


}