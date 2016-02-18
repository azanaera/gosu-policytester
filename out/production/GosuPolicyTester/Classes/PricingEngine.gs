package Classes

uses Interfaces.IPolicyPriceQuote
uses Interfaces.IPricingEngine

uses java.text.DecimalFormat

/**
 * Created by eazana on 2/15/2016.
 */
class PricingEngine implements IPricingEngine {

    /**
     * This method will generate a price for the policy using the following logic:
     * 1: Calculate a price for each car on the policy as follows: if the Car's make is "Mercedes", then the price is
     * 1.5 percent of its price. If it is not a "Mercedes" then the price is 1.0 percent of its price.
     * 2: If a car is older than 5 years, decrease the price by 0.5%
     * 3: Add all the prices for all the cars as a sub-total
     * 4: For each driver on the policy, add a $125.00 charge
     * 5: add it all up into one total price
     * 6: return the PolicyPriceQuote (the downPayment is 25% of the total price)
     *
     * @param aPolicy : Policy to be priced
     * @return The calculated Policy price quote for the policy passed as a parameter
     */
    override function pricePolicy(aPolicy: Policy): IPolicyPriceQuote {
        var yearNow = Calendar.getInstance().get(Calendar.YEAR)
        var dformat = new DecimalFormat("###,###.##")
        var subTotal   : double
        var totalPrice : double
        var driversPrice : double
        var priceBreakDown = new HashMap<CoverageType,Double>()
        var subPriceBreakDown : double

        foreach(item in aPolicy.Vehicles)
        {
            subTotal += item.Make=="Mercedes" ? item.Price*0.015 : item.Price*0.010
            subTotal -= yearNow-item.Year>5 ? item.Price*0.005 : 0

/**          add up all coverages in one policy / store in raw variable
//          add this up on @var totalPrice */
            foreach(coverage in item.Coverages)
            {
                subPriceBreakDown = 0
                if(priceBreakDown.containsKey(coverage.InsuranceCoverageType))
                {
                    subPriceBreakDown = priceBreakDown.get(coverage.InsuranceCoverageType)
                }

                subTotal += coverage.getBaseRate()

                //double the value of @var subPriceBreakDown
                subPriceBreakDown+=coverage.getBaseRate()

                //replace a new value on the hashmap
                priceBreakDown.put(coverage.InsuranceCoverageType,subPriceBreakDown)
            }
        }

        driversPrice = aPolicy.Drivers.Count * 125.00
        print("Price of Drivers: ${dformat.format(driversPrice)}")
        print("Subtotal : ${subTotal} (Percentage of the Car's Price & how old it is) \n\n")

        //compute the count of drivers
        totalPrice = subTotal + driversPrice

        return new PolicyPrice(totalPrice,aPolicy.PolicyNumber,priceBreakDown)
    }
}