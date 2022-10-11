class DbConnection {
    constructor() {
        this.user = 'root';
        this.password = "admin";
        this.db = "incedodb";
        this.host = "localhost"
        this.port = 3306
    }
    getUserName() {
        return this.user
    }
    getPassword() {
        return this.password
    }
    getHostName() {
        return this.host
    }
    getDataBaseName() {
        return this.db
    }
    getPort(){
        return this.port;
    }
}
module.exports = DbConnection;