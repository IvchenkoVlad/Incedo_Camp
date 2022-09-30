//create and array of customers that have two properties id, name
//perform all respective operation mentioned below -->
//createCusotmer()
//updateCustomer()
//deleteCustomer()
//listCustomer()
//write code with switch case perform various operations
//array mozilla javascript push
class Customer {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
}
let arrayOfCustomers = [];
function createCustomer(id, name) {
    //check if was in array before
    let index = arrayOfCustomers.findIndex(x => x.id === id);
    if (index == -1) {
        arrayOfCustomers.push(new Customer(id, name));
        console.log(`CREATED-> ${id} :: ${name}`);
    }
    else {
        console.log(`ID:${id} was in the array already. Nothing created.`);
    }
    //add if not existed
}
function updateCustomerById(id, newName) {
    let customerToUpdate = arrayOfCustomers.find(x => x.id === id);
    if (customerToUpdate == null) {
        console.log(`The id:${id} of the customer you try to update doesnt exist`);
    }
    else {
        console.log(`UPDATED-> OLD-> ${id} :: ${customerToUpdate.name} TO NEW -> ${id} :: ${newName}`);
        arrayOfCustomers.find(x => x.id === id).name = newName;
    }
}
function deleteCustomer(id) {
    let deletingIndex = arrayOfCustomers.findIndex(x => x.id === id);
    if (deletingIndex == -1) {
        console.log(`No records with id:${id}.`);
    }
    else {
        console.log(`DELETED-> ${arrayOfCustomers[deletingIndex].id} : ${arrayOfCustomers[deletingIndex].name}`);
        arrayOfCustomers.splice(deletingIndex, 1);
    }
}
function listCustomers() {
    console.log('-------------LIST-------------');
    for (let i = 0; i < arrayOfCustomers.length; i++) {
        console.log(`${i + 1}. ID: ${arrayOfCustomers[i].id} :: NAME: ${arrayOfCustomers[i].name}`);
    }
    console.log('------------------------------');
}
const message = `Instuctions to manipulate customer array:
                Press '1' to create a new customer
                Press '2' to update customer details by id
                Press '3' to delete customer from the list by id
                Press '4' to list all the customers
                Press '0' to end program`;
let flag = true;
while (flag) {
    let num = prompt(message); //this is string
    switch (num) {
        case '1': {
            let id = prompt('Enter id:');
            let name = prompt('Enter name:');
            createCustomer(Number(id), name);
            break;
        }
        case '2': {
            let id = prompt('Enter id:');
            let name = prompt('Enter NEW name:');
            updateCustomerById(Number(id), name);
            break;
        }
        case '3': {
            let id = prompt('Enter id of item you want to delete:');
            deleteCustomer(Number(id));
            break;
        }
        case '4': {
            listCustomers();
            break;
        }
        case '0': {
            flag = false;
            break;
        }
    }
}
//# sourceMappingURL=hw.js.map