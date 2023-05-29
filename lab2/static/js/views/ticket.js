const ticketModel = new Ticket()
function initAddForm () {
    const form = window.document.querySelector('#ticket-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const ticketDataData = {}
        formData.forEach((value, key) => {
            ticketDataData[key] = value
        })

        ticketModel.Create(ticketDataData)
    })
}
function initList () {
    window.jQuery('#ticket-list').DataTable({
        data: ticketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Number', data: 'number' },
            { title: 'Price', data: 'price' },
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

    ticketModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    const update_number_input = document.querySelector('#update_number')
    update_number_input.value = formData.number

    const update_price_input = window.document.querySelector('#update_price')
    update_price_input.value = formData.price

    form.addEventListener('submit', function (e){
        const newData = {
            id: formData.id,
            number: update_number_input.value,
            price: update_price_input.value,
        }

        ticketModel.Update(formData, newData)
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
    document.addEventListener('ticketListDataChanged', function (e) {
        const dataTable = window.jQuery('#ticket-list').DataTable()

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