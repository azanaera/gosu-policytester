package Classes

/**
 * Created by eranoazana on 2/12/2016.
 */
class Person {
    private var _firstName : String as readonly FirstName
    private var _lastName  : String as readonly LastName
    private var _address   : Address as Address

    private construct(){}

    public construct(firstname : String, lastname : String, address : Address)
    {
        _firstName = firstname
        _lastName  = lastname
        _address   = address
    }

    override function toString() : String
    {
        return "${FirstName} ${LastName} \nAddress:${Address} "
    }
}