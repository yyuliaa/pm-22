class Train extends BaseModel {
    constructor () {
        super('trains', 'number')
        this.fields = this.fields.concat(['name','route', 'number'])
    }
}