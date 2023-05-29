const trainModel = new Train()
function initAddForm () {
    const form = window.document.querySelector('#train-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)

        const data_1 = []
        const data_2 = []

        formData.forEach((value, key) => {
            data_1.push(key)
            data_2.push(value)
        })

        const trainData = {}

        trainData[data_1[0]] = data_2[0]
        trainData['route'] = data_2[1] + '-' + data_2[2]
        trainData[data_1[3]] = data_2[3]

        trainModel.Create(trainData)
    })
}
function initList () {
    window.jQuery('#train-list').DataTable({
        data: trainModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Name', data: 'name' },
            { title: 'Route', data: 'route' },
            { title: 'Number', data: 'number' },
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

    trainModel.Delete(formData)
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

    const update_number_input = window.document.querySelector('#update_number')
    update_number_input.value = formData.number

    const update_departure_input = window.document.querySelector('#update_departure')
    update_departure_input.value = formData.route.split('-')[0]

    const update_destination_input = window.document.querySelector('#update_destination')
    update_destination_input.value = formData.route.split('-')[1]

    form.addEventListener('submit', function (e){

        const newData = {
            id: formData.id,
            name: update_name_input.value,
            route: update_departure_input.value+'-'+update_destination_input.value,
            number: update_number_input.value,
        }

        trainModel.Update(formData, newData)
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
    document.addEventListener('trainListDataChanged', function (e) {
        const dataTable = window.jQuery('#train-list').DataTable()

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
