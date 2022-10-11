class Project{
    constructor(name, sapid, projecthours, leaveholidayhours, noonshifts, nightshifts, taeligibledays, transportationallowance, totalallowance){
        this.name = name;
        this.sapid = sapid;
        this.projecthours = projecthours;
        this.leaveholidayhours = leaveholidayhours;
        this.noonshifts = noonshifts;
        this.nightshifts = nightshifts;
        this.taeligibledays = taeligibledays;
        this.transportationallowance = transportationallowance;
        this.totalallowance = totalallowance;
    }
}
module.exports = Project;