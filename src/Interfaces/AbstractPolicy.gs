package Interfaces

uses Classes.Car
uses Classes.Coverage
uses Classes.CoverageType
uses Classes.Person

/**
 * Created by Wayne Iluyomade on 2/15/2016.
 * Base class for Policy. Specifies base methods for Policy instances
 * All implementations of this class must utilize the provided assignPolicyNumber to acquire a unique policy number
 * for each instance.
 * Each policy has an Effective Date which is the date the insurance coverage becomes effective and an Expiration Date
 * which is the date when coverage ends.
 */
abstract class AbstractPolicy {
  final var POLICY_NUMBER_LENGTH = 8
  private static var _initial = 200 //used as starting point for PolicyNumbers
  protected var _policyNbr : String as readonly PolicyNumber

  abstract property get EffectiveDate() : Date
  abstract property get ExpirationDate() : Date
  abstract property get Vehicles() : ArrayList<Car>
  abstract property get Drivers() : ArrayList<Person>

  protected function assignNextPolicyNumber() : String {
    var currentNbr = _initial
    _initial++  //increment for the next time.
    return (currentNbr as String).leftPad(POLICY_NUMBER_LENGTH).replace(' ', '0')
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
  abstract public function addCoverage(cov : Coverage, veh : Car)

  /**
   * The implementation of this method should return the coverages that are associated with the specified vehicle
   * @param veh
   * @return
   */
  abstract public function getCarCoverages(veh : Car) : ArrayList<Coverage>

  /**
   * Implementation of this method will return true if this policy is in force.
   * A Policy is in force on the specified date if the date falls on or between the effective date and the expiration date.
   * @param aDate : the date being checked.
   * @return
   */
  abstract public function isPolicyInForce(aDate : Date) : boolean

  /**
   * The Implementation of this method must return the number of cars that have coverages of the specified type on this Policy
   * @param coverageType
   * @return
   */
  abstract public function getCoveredCarCount(coverageType : CoverageType) : Integer
}