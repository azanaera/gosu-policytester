package Classes

uses Interfaces.AbstractPolicy


/**
 * Created by eranoazana on 2/12/2016.
 */
class Policy extends AbstractPolicy{

    private var _primaryInsuredPerson : Person as readonly PrimaryInsuredPerson
    private var _vehicles : ArrayList<Car>
    private var _drivers : ArrayList<Person>
    private var _effectivedate  = Date.Now // for modification
    private var _expirationdate = new Date()
    private construct(){}

    public construct(customer : Person, term : PolicyTerm)
    {
        _vehicles = new ArrayList<Car>()
        _drivers  = new ArrayList<Person>()
        super._policyNbr = super.assignNextPolicyNumber()
        _primaryInsuredPerson = customer
        switch (term)
        {
            case ONEYEAR:
                _expirationdate = Date.Now.addYears(1)
                break
            case SIXMONTHS:
                _expirationdate = Date.Now.addMonths(6)
                break
        }
    }
    public construct(effectDate : Date, expireDate : Date)
    {
        _vehicles = new ArrayList<Car>()
        _drivers  = new ArrayList<Person>()
        super._policyNbr = super.assignNextPolicyNumber()
        _effectivedate = effectDate
        _expirationdate = expireDate
    }

    override function toString() : String
    {
        var str =
            "Policy Contract\n" +
            "=======================================\n" +
            "Primary Insured Person: ${PrimaryInsuredPerson} \n" +
            "Effective Date: ${EffectiveDate.toString()}  \n" +
            "Expiration Date: ${ExpirationDate.toString()}  \n" +
            "=======================================\n" +
            "Car List | Count : ${Vehicles.Count}\n"

        foreach(car in Vehicles index i)
        {
            str+=("${i+1}.\t${car.Color} ${car.Make} ${car.Model} ${car.Year}\n\t -Price: $${car.Price} \n")
        }
          str+="=======================================\n"
          str+="Driver List | Count: ${Drivers.Count}\n"

        foreach(driver in Drivers index i)
        {
            str+="${i+1}.\t ${driver.FirstName} ${driver.LastName}\n"
        }

        return str
    }

    override property get EffectiveDate(): Date {
        return _effectivedate
    }

    override property get ExpirationDate(): Date {
        return _expirationdate
    }

    override property get Vehicles(): ArrayList<Car> {
        return _vehicles
    }

    override property get Drivers(): ArrayList<Person> {
        return _drivers
    }

    property set Vehicles(value : ArrayList<Car>)
    {
        _vehicles = value
    }

    /**
     * The implementation of this method should return the coverages that are associated with the specified vehicle
     *
     * @param veh
     * @return
     */
    override function getCarCoverages(veh: Car): ArrayList<Coverage> {
        var carCovs = new ArrayList<Coverage>()
        foreach(coverage in veh.Coverages)
        {
            carCovs.add(coverage)
        }
        return carCovs //ok
    }

    /**
     * Implementation of this method will return true if this policy is in force.
     * A Policy is in force on the specified date if the date falls on or between the effective date and the expiration date.
     *
     * @param aDate : the date being checked.
     * @return
     */
    override function isPolicyInForce(aDate: Date): boolean {
        if(aDate >= EffectiveDate && aDate <= ExpirationDate)
            return true
        else
            return false
    }

    /**
     * The Implementation of this method must return the number of cars that have coverages of the specified type on this Policy
     *
     * @param coverageType
     * @return
     */
    override function getCoveredCarCount(coverageType: CoverageType): Integer {
        var count = 0

        foreach(car in Vehicles)
        {
           foreach(coverage in car.Coverages)
           {
               if(coverage.InsuranceCoverageType == coverageType)
                   count++
           }
        }

        return count
    }

    /**
     * The implementation of this method should add the specified coverage to the Policy and associate the coverage with
     * the specified Car. The Car must already exist on the Policy -  this method must throw an exception
     * indicating that the specified car does not exist on the Policy
     *
     * @param cov - coverage to be added to the policy
     * @param veh - vehicle to be covered by the specified coverage
     * @throws Exception if the specified car is not already on the Policy or if the specified car already has the coverage added.
     */
    override function addCoverage(cov: Coverage, veh: Car) {
//                 //doesnt exist on the policy
        if(!Vehicles.contains(veh))
            throw new Exception("The car is not on the Policy.")
        else
        cov.CoveredCar = veh
        cov.ParentPolicy = this
        veh.addCoverage(cov,this)
    }
}