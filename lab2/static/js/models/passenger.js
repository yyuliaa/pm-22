class Passenger extends BaseModel {
    constructor () {
        super('passengers', 'passport_number')
        this.fields = this.fields.concat(['name', 'surname', 'passport_number'])
    }
}