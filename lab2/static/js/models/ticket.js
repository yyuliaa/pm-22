class Ticket extends BaseModel {
    constructor () {
        super('tickets', 'number')
        this.fields = this.fields.concat(['number', 'price'])
    }
}