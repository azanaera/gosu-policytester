package Classes

uses Interfaces.AbstractPolicy

/**
 * Created by Wayne Iluyomade on 2/14/2016.
 * Insurance coverage is issued by an insurer in the event of an unforeseen or unwanted occurrences.
 * There are general different types of insurance coverages. For an Auto Insurance Policy, examples include:
 * Bodily Injury Coverage: the insurer pays for any hospital bills for injured driver and passengers
 * Liability Coverage: the insurer pays for any damages to another person's property during in an accident
 * Comprehensive Coverage: the insurer pays for the insured's own car damage in event of an accident
 *
 * This implementation of a Coverage also specifies the annual base rate for each coverage
 */
class Coverage {

  private var _covType : CoverageType as InsuranceCoverageType
  private var _policy : AbstractPolicy as ParentPolicy  //The policy on which coverage exists
  private var _vehicle : Car as CoveredCar              //the vehicle that is covered by this coverage
  private static var _baseRates : HashMap<CoverageType, Double> =
        {BodilyInjury -> 75.00, Liability -> 85.00, Comprehensive -> 105.00}

  //construct(){} //No default constructor. We must only contruct coverages of the correct type
  construct( type : CoverageType){
    _covType = type
  }

  public function getBaseRate() : Double{
    return _baseRates.get(InsuranceCoverageType)
  }

}