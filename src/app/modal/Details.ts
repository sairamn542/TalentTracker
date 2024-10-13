export class EmpDetails{
    empId : number;
    name : string;
    city : string;
    state : string;
    emailId:string;
    contactNo : string;
    address : string;
    pincode : string
    constructor() {
        this.emailId = ''
        this.name = ''
        this.empId = 1;
        this.city = ''
        this.state = ''
        this.contactNo = ''
        this.address = ''
        this.pincode = ''
    }
}