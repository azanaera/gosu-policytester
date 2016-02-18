package Classes

/**
 * Created by eranoazana on 2/12/2016.
 */
class Car {
    private var _vin : String as readonly VIN //Vehicle Identification Number
    private var _year : int as readonly Year
    private var _make : String as readonly Make
    private var _model : String as readonly Model
    private var _price : Double as Price
    private var _color : Color as Color
    private var _coverages : ArrayList<Coverage> as Coverages

    private construct(){}

    public construct(year : int, make : String, model : String)
    {
        _coverages = new ArrayList<Coverage>()
        _year = year
        _make = make
        _model = model
        generateVIN()
    }
    public construct(year : int, make : String, model : String, price : Double, color : Color,coverage : Coverage[])
    {
        _coverages = new ArrayList<Coverage>()
        _year = year
        _make = make
        _model = model
        _price = price
        _color = color

        foreach(zcoverage in coverage)
        {
            _coverages.add(zcoverage)
        }

    }

    public function addCoverage(cov : Coverage,pol : Policy){
        cov.ParentPolicy = pol
        cov.CoveredCar = this
       foreach(coverage in Coverages)
       {
           if(cov.InsuranceCoverageType == coverage.InsuranceCoverageType)
               throw new Exception("The car already has the coverage.")
       }
        Coverages.add(cov)

    }

    public function addCoverages(covs : ArrayList<Coverage>,pol : Policy){
        foreach(cove in covs)
        {
          addCoverage(cove,pol)
        }
    }

    private function generateVIN(){
        _vin = "VIN${Make.charAt(0)}${Year}${Date.Now.getTime()}"
    }

    override function toString() : String
    {
        return Color!=null && Price!=0 ? "${Color} ${Make} ${Model} ${Year} ($${Price})" : "${Make} ${Model} ${Year}"
    }


}