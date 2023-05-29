class BaseModel {
  constructor (collectionName, unique) {
    this.collectionName = collectionName
    this.fields = ['id']
    this.unique = unique
  }
  Unique (collection, row) {

    if(collection.length === 0) return true

    for(const element of collection){
      if(element[this.unique]===row[this.unique]) return false;
    }
    return true;
  }
  getNextId (collection) {
    return collection.length + 1
  }
  GetEmpty () {
    const entry = {}

    this.fields.forEach(element => {
      entry[element] = null
    })

    return entry
  }
  Select () {
    const stored = localStorage.getItem(this.collectionName)
    const collection = stored ? JSON.parse(stored) : []

    return collection
  }
  Commit (collection) {
    localStorage.setItem(this.collectionName, JSON.stringify(collection))
  }
  FindById (id) {
    return this.Select().find(item => item.id === id)
  }
  FindIndexById (id) {
    return this.Select().findIndex(item => item.id === id)
  }
  Create (row) {
    const collection = this.Select()
    const entry = this.GetEmpty()

    if(!this.Unique(collection, row)) {
      const event = new CustomEvent(`${this.collectionName}ListDataNotChanged`, { detail: collection })
      document.dispatchEvent(event)
      console.log(event)
    }
    else{
      entry.id = this.getNextId(collection)
      for (const key in row) {
        if (entry.hasOwnProperty(key) &&
            entry.key !== 'id') {
          entry[key] = row[key]
        }
      }

      collection.push(entry)

      this.Commit(collection)

      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
  }
  Delete(row) {
    const collection = this.Select()
    const id = this.FindIndexById(row.id)

    collection.splice(id, 1);

    collection.forEach(element => {
      element.id = collection.findIndex(elem => elem.id === element.id) + 1
    })

    this.Commit(collection)

    const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
    document.dispatchEvent(event)
  }
  Update(old_row, new_row){
    const collection = this.Select()
    const id = this.FindIndexById(old_row.id)

    collection.splice(id,1)

    if(!this.Unique(collection, new_row)) {
      const event = new CustomEvent(`${this.collectionName}ListDataNotChanged`, { detail: collection })
      document.dispatchEvent(event)
    }
    else{
      collection.splice(id, 0, new_row)

      this.Commit(collection)

      const event = new CustomEvent(`${this.collectionName}ListDataChanged`, { detail: collection })
      document.dispatchEvent(event)
    }


  }
}
