package Core

uses Classes.*

/**
 * Created by eranoazana on 2/12/2016.
 */
class Main
{

  static function main(args : String[])
  {
    //create new customer
    var customer = new Person("Era","Azana",new Address("212 Baker St.","London","United Kingdom",16))
    //create a new policy with effective date
    var policy   = new Policy(Date.Now,Date.getNow())

    //create 2 new Cars and add each coverage
    var car1 = new Car(2016,"Honda","Accord",10000,Color.BLUE,{
        new Coverage(BodilyInjury),
        new Coverage(Liability)}) //75 x 2
    var car2 = new Car(2016,"Nissan","Almera",10000,Color.RED,
        {new Coverage(BodilyInjury),
            new Coverage(Liability)}) //75
    var car3 = new Car(2016,"Mitsubishi","Montero",10000,Color.RED,{
        new Coverage(Comprehensive),
        new Coverage(BodilyInjury)}) //75


    //Add to the insured Vehicles
    policy.Vehicles.add(car1)
    policy.Vehicles.add(car2)
    policy.Vehicles.add(car3)

    //create 2 new drivers
    var driver1 = new Person("John","Watson",new Address("212 Baker St.","London","United Kingdom",16))
    var driver2 = new Person("Sherlock","Holmes",new Address("212 Baker St.","London","United Kingdom",16))

    //create spouse instance for insured driver
    var wifey = new Person("Jane","Abbington",new Address("212 Baker St.","London","United Kingdom",16))

    //add the policyholder, spouse and drivers to the insured driver
    policy.Drivers.add(customer)
    policy.Drivers.add(wifey)
    policy.Drivers.add(wifey)

    var priceEngine = new PricingEngine().pricePolicy(policy)
    print(policy)
    print(priceEngine)
    print("\n\n")

  }
}