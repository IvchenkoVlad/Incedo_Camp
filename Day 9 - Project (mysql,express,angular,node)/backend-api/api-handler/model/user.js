class User{
    constructor(username, password, name, role, status, requestdate){
        this.username = username;
        this.password = password;
        this.name = name;
        this.role = role;
        this.status = status;
        this.requestdate = requestdate;
    }
}
module.exports = User;