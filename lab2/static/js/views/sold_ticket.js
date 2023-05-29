const sold_ticketModel = new Sold_ticket();
const ticketModel = new Ticket();
const trainModel = new Train();
const passengerModel = new Passenger();

function initAddForm () {

    const passenger_input = document.querySelector('#passenger')
    passengerModel.Select().forEach(element => {
        passenger_input.innerHTML += `<option value="${element.passport_number}">${element.name} ${element.surname} ${element.passport_number}</option>`
    })

    const ticket_input = document.querySelector('#ticket')
    ticketModel.Select().forEach(element => {
        ticket_input.innerHTML += `<option value="${element.number}">${element.number} - ${element.price}</option>`
    })

    const train_input = document.querySelector('#train')
    trainModel.Select().forEach(element => {
        train_input.innerHTML += `<option value="${element.number}">${element.name} - ${element.route} - ${element.number}</option>`
    })

    const form = window.document.querySelector('#sold_ticket-add-form')
    form.addEventListener('submit', function (e) {
        const formData = new FormData(e.target)
        const sold_ticketDataData = {}
        formData.forEach((value, key) => {
            sold_ticketDataData[key] = value
        })

        sold_ticketModel.Create(sold_ticketDataData)
    })
}
function initList () {

    window.jQuery('#sold_ticket-list').DataTable({
        data: sold_ticketModel.Select(),
        columns: [
            { title: 'ID', data: 'id' },
            { title: 'Passenger', data: 'passenger' },
            { title: 'Ticket', data: 'ticket' },
            { title: 'Train', data: 'train' },
            { title: 'Date', data: 'date' },
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

    sold_ticketModel.Delete(formData)
}
function initUpdateElementForm(row) {
    const formData = JSON.parse(row)

    const form = document.querySelector('#update-form')
    form.style.display = 'block'

    const train_input = document.querySelector('#update_train')
    trainModel.Select().forEach(element => {
        train_input.innerHTML += `<option value="${element.number}">${element.name} - ${element.route} - ${element.number}</option>`
    })

    const cancel_update_button = document.querySelector('#btn-cancel')
    cancel_update_button.addEventListener('click',function (){
        form.style.display = 'none'
    })

    form.addEventListener('submit', function (e){
        const newData = {
            id: formData.id,
            passenger: formData.passenger,
            ticket: formData.ticket,
            train: train_input.value,
            date: formData.date,
        }

        sold_ticketModel.Update(formData, newData)
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
function initFindMostPopularRoute() {

    const form = window.document.querySelector('#report-most_popular_route-form')
    form.addEventListener('submit', function(e){
        const sold_tickets = sold_ticketModel.Select()
        const trains = trainModel.Select()

        const tickets_and_trains = []

        sold_tickets.forEach(element => {
            let train = trains.filter(train => train.number===element.train)[0]

            tickets_and_trains.push({
                train: train.number,
                route: train.route.replace('-','').split('').sort().join('-')
            })
        })

        let mf = 1;
        let m = 0;
        let item;
        for (let i=0; i<tickets_and_trains.length; i++)
        {
            for (let j=i; j<tickets_and_trains.length; j++)
            {
                if (tickets_and_trains[i].route == tickets_and_trains[j].route)
                    m++;
                if (mf<m)
                {
                    mf=m;
                    item = tickets_and_trains[i].route;
                }
            }
            m=0;
        }

        document.querySelector('#m_popular_route').value = item

        e.preventDefault()
    })

}
function initFindMostProfitableRoute() {

    const form = window.document.querySelector('#report-most_profitable_route-form')
    form.addEventListener('submit', function(e){

        const sold_tickets = sold_ticketModel.Select()
        const tickets = ticketModel.Select()
        const trains = trainModel.Select()

        const tickets_and_trains = []

        sold_tickets.forEach(element => {
            let train = trains.filter(train => train.number===element.train)[0]
            let ticket = tickets.filter(ticket => ticket.number===element.ticket)[0]

            tickets_and_trains.push({
                route: train.route.replace('-','').split('').sort().join('-'),
                price: parseInt(ticket.price),
            })
        })

        const routes = [...new Set(tickets_and_trains.map(a => a.route))]

        const routes_and_prices = []

        routes.forEach(route => {
            const prices = tickets_and_trains.filter(elem => elem.route===route).map(a => a.price)
            let price_to_route = 0

            prices.forEach(price => price_to_route += price)

            routes_and_prices.push({
                route: route,
                price: price_to_route,
            })
        })

        console.log(routes_and_prices)

        let max_route = '', max_price = 0


        routes_and_prices.forEach(element => {
            if(max_price < element.price) max_route = element.route
        })

        document.querySelector('#m_profitable_route').value = max_route

        e.preventDefault()
    })

}
function initSoldTicketsByTrainNumber(){
    const form = window.document.querySelector('#report-sold_tickets_by_train-form')

    const train_input = window.document.querySelector('#train_for_sold_tickets')
    trainModel.Select().forEach(element => {
        train_input.innerHTML += `<option value="${element.number}">${element.name} - ${element.route} - ${element.number}</option>`
    })

    form.addEventListener('submit', function(e){
        const sold_tickets_output = window.document.querySelector('#sold_tickets_by_train')
        sold_tickets_output.innerHTML = ''

        const numbers = sold_ticketModel.Select().filter(ticket => ticket.train===train_input.value).map(ticket => ticket.ticket)

        const tickets = []

        numbers.forEach(ticket_number => {
            tickets.push(ticketModel.Select().filter(ticket => ticket.number===ticket_number)[0])
        })

        tickets.forEach(element => {
            sold_tickets_output.innerHTML += `<option value="${element.number}">${element.number} - ${element.price}</option>`
        })

        e.preventDefault()
    })
}

function initUnsoldRoutesNumber(){
    const form = window.document.querySelector('#report-routs_without_sold_tickets-form')

    const routs = [... new Set(trainModel
        .Select()
        .map(train => train.route
            .replace('-','')
            .split('')
            .sort()
            .join('-')))]

    const used_routes = [... new Set(trainModel
        .Select()
        .filter(element => [... new Set(sold_ticketModel
            .Select()
            .map(ticket => ticket.train))]
            .includes(element.number))
        .map(train => train.route
            .replace('-','')
            .split('')
            .sort()
            .join('-')))]

    const unused_routes = routs.filter(route => !used_routes.includes(route))

    form.addEventListener('submit', function (e){
        const route_input = document.querySelector('#route')
        unused_routes.forEach(element => {
            route_input.innerHTML += `<option value="${element}">${element}</option>`
        })

        e.preventDefault()
    })
}

window.addEventListener('DOMContentLoaded', e => {
    initAddForm()
    initList()
    initListEvents()
    initEventToDeleteButtons()
    initEventToUpdateButtons()
    initFindMostPopularRoute()
    initFindMostProfitableRoute()
    initSoldTicketsByTrainNumber()
    initUnsoldRoutesNumber()
})