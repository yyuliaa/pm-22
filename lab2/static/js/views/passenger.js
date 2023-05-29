const passengerModel = new Passenger()
function initAddForm () {
    const form = window.document.querySelector('#passenger-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const passengerData = {}
        formData.forEach((value, key) => {
            passengerData[key] = value
        })

        passengerModel.Create(passengerData)
    })
}
function initList () {
    window.jQuery('#passenger-list').DataTable({
        data: passengerModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Surname', data: 'surname' },
            { title: 'Passport_number', data: 'passport_number' },
            {
                data: null,
                title: 'Action',
                wrap: true,
                render: function (item) {
                    const def = JSON.stringify(item)
                    return `<div>
                        <div class="btn-group"> <button type="button"  id="btn_delete" class="btn_delete btn-warning " data-item='${def}'>Delete</button></div>
                        <div class="btn-group"> <button type="button"  id="btn_update" class="btn_update btn-primary " data-item='${def}'>Update</button></div>
                    </div>`
                },
            },
        ]
    })
}
function initEventToDeleteButtons() {
    const elems = document.querySelectorAll('#btn_delete')

    elems.forEach((item) => {
        item.addEventListener('click', function () {
            initDeleteElement(item.dataset.item)
        })
    })
}
function initDeleteElement(row) {
    const formData = JSON.parse(row)

    passengerModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_name_input = document.querySelector('#update_name')
    update_name_input.value = formData.name

    const update_surname_input = window.document.querySelector('#update_surname')
    update_surname_input.value = formData.surname

    const update_passport_number_input = window.document.querySelector('#update_passport_number')
    update_passport_number_input.value = formData.passport_number

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            name: update_name_input.value,
            surname: update_surname_input.value,
            passport_number: update_passport_number_input.value,
        }

        passengerModel.Update(formData, newData)
    })
}
function initEventToUpdateButtons() {
    const elems = document.querySelectorAll('#btn_update')

    elems.forEach((item) => {
        item.addEventListener('click', function () {
            initUpdateElementForm(item.dataset.item)
        })
    })
}
function initListEvents () {
    document.addEventListener('passengerListDataChanged', function (e) {
        const dataTable = window.jQuery('#passenger-list').DataTable()

        dataTable.clear()
        dataTable.rows.add(e.detail)
        dataTable.draw()
    }, false)
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
    initEventToDeleteButtons()
    initEventToUpdateButtons()
})
