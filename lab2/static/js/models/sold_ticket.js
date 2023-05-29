class Sold_ticket extends BaseModel {
    constructor () {
        super('sold_tickets','ticket')
        this.fields = this.fields.concat(['passenger', 'ticket', 'train', 'date'])
    }
}