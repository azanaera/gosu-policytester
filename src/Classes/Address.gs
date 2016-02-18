package Classes

/**
 * Created by eranoazana on 2/12/2016.
 */
class Address {

    private var _street : String as Street
    private var _city : String as City
    private var _province : String as Province
    private var _zip : int as Zip

    construct(){}

    /**Custom Constructor */
    construct(street : String, city : String, province : String, zip : int)
    {
      _street   = street
      _city     = city
      _province = province
      _zip      = zip
    }

    override function toString() : String
    {
        return " ${Street} ${City}, ${Province}  (+${Zip}) "
    }

}