package Classes

uses Interfaces.IPolicyPriceQuote

uses java.text.DecimalFormat

/**
 * Created by eazana on 2/15/2016.
 */
class PolicyPrice implements IPolicyPriceQuote{
    var _totalamount : double
    var _downPayment : double
    var _policyNbr   : String
    var _priceBreakDown : HashMap<CoverageType, Double>

    construct(amount : double,policynbr : String, priceBreakdown : HashMap<CoverageType, Double>)
    {
        _priceBreakDown = priceBreakdown
        _totalamount = amount
        _downPayment = amount * 0.25
        _policyNbr   = policynbr
    }

    override function toString() : String
    {
        var dformat =  new DecimalFormat("###,###.##")
        var str =
            "Policy Quoting\n" +
            "=======================================================\n"+
            "Policy Number : ${PolicyNumber}\n" +
            "Total Price : $${dformat.format(TotalPrice)}\n" +
            "Down Payment Price : $${dformat.format(DownPayment)}\n" +
            "Coverage subscriptions:\n"

        foreach(coverage in PriceBreakDown.entrySet() index i)
        {
            str+="${i+1}.\tType   : ${coverage.Key}\n\tPrice  : \t${coverage.Value}\n"
        }

        return  str
    }

    /**
         * This interface represents a PolicyPriceQuote as priced by an IPricingEngine implementation
         * The downPayment property should contain a value that is 25% of the TotalPrice property
         * An instance of the IPolicyPriceQuote implementation class will be returned by the PricingEngine
         * when the PricingEngine's pricePolicy method is called.
         */
    override property get PolicyNumber(): String
    {
        return _policyNbr
    }

    override property get DownPayment(): Double
    {
        return _downPayment
    }

    override property get TotalPrice(): Double {
        return _totalamount
    }

    override property get PriceBreakDown(): HashMap<CoverageType, Double> {
        return _priceBreakDown
    }
}