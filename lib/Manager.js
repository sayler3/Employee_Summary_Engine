// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require("./Employee");

class Manger extends Employee{
    constructor(name, id, emial, officeNumber){

        super(name, id, emial);

        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getRole(){
        return this.role;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manger;