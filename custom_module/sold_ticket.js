// Необхідні змінні
let last_sold_ticket_number = 0;
let tickets_list = new Array();

// Клас - проданий квиток
class Sold_Ticket {

    // Конструктор класу
    constructor (passanger, train, ticket, date) {

        this.passanger = passanger;
        this.train = train;
        this.ticket = ticket;
        this.date = date;


        if (passanger === "" ||
            typeof passanger  === 'undefined') { this.passanger = "Не встановлено";  }
        if (train === "" ||
            typeof train      === 'undefined') { this.train     = "Не встановлено";    }
        if (ticket === "" ||
            typeof ticket     === 'undefined') { this.ticket    = "Не встановлено";    }
        if (date === "" ||
            typeof date       === 'undefined') { this.date      = "Не встановлено";    }


    }

    /*/
    /функція для порівняння двох квитків (за номером потяга)
    function compare (tick1, tick2) {
        if(tick1.train.number<tick2.train.number)
            return -1;
        if(tick1.train.number>tick2.train.number)
            return 1;
        return 0;
    }
*/
}

//сортування списку проданих квитків і пошук найпопулярнішого потяга
function find_most_popular_train (sold_tickets_list) {
    sold_tickets_list.sort((tick1,tick2)=>{
        if(tick1.train.number<tick2.train.number)
            return -1;
        if(tick1.train.number>tick2.train.number)
            return 1;
        return 0;
    });
    let count=1;
    let train=sold_tickets_list[0].train.number;
    let max_count=1;
    for(let i=1; i<sold_tickets_list.length; i++){
        if(sold_tickets_list[i].train.number==sold_tickets_list[i-1].train.number){
            count++;
            if(count>max_count){
                train=sold_tickets_list[i].train.number;
                max_count=count;
            }
        }
        else count=1;
    }
    return train;
}

//сортування списку проданих квитків і пошук найменш популярного потяга
function find_least_popular_train (sold_tickets_list) {
    sold_tickets_list.sort((tick1,tick2)=>{
        if(tick1.train.number<tick2.train.number)
            return -1;
        if(tick1.train.number>tick2.train.number)
            return 1;
        return 0;
    });
    let count=1;
    let train=sold_tickets_list[0].train.number;
    let min_count=1000000;
    for(let i=1; i<sold_tickets_list.length; i++){
        if(sold_tickets_list[i].train.number==sold_tickets_list[i-1].train.number){
            count++;}
        else{
            if(count<min_count){
                train=sold_tickets_list[i].train.number;
                min_count=count;
            }
            count=1;
        }
    }
    if(count<min_count){
        train=sold_tickets_list[sold_tickets_list.length-1].train.number;
        min_count=count;
    }
    return train;
}



// ...............................................................................................



// Додавання нового проданого квитка
function add_sold_ticket (passanger, train, ticket, date, sold_tickets_list) {

    let sold_ticket = new Sold_Ticket(passanger, train, ticket, date);
    sold_tickets_list.push(sold_ticket);

    return sold_ticket;

}


// Видалення проданого квитка з колекції
function remove_sold_ticket (ticket, sold_tickets_list) {

    for (let z = 0; z < sold_tickets_list.length; z++) {

        let sold_ticket = sold_tickets_list[z];
        if (sold_ticket.ticket === ticket) {
            sold_tickets_list.splice(z, 1);
            return 1; }

    }

    return -1;

}


// Редагувати проданий квиток
function edit_sold_ticket (ticket, sold_ticket_list, new_train) {

    let sold_ticket = find_sold_ticket(ticket.number, sold_ticket_list);

    if (sold_ticket === -1) { return -1; }

    let id = sold_ticket_list.indexOf(sold_ticket[0]);
    sold_ticket_list[id].train = new_train;
    return 1;

}


// ...............................................................................................

// Повертаємо список усіх проданих квитків
function get_sold_tickets_list () {

    return sold_tickets_list;

}

// Задаємо список усіх проданих квитків
function set_sold_tickets_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_sold_ticket(element.passanger,
            element.train,
            element.ticket,
            element.date);
    }
}

// Повертає проданий квиток по його номеру
function get_sold_ticket_by_ticket (ticket, sold_tickets_list) {

    let list = sold_tickets_list;

    for (let z = 0; z < list.length; z++) {

        let sold_ticket = list[z];
        if (sold_ticket.ticket === ticket) { return sold_ticket; }

    }

    return -1;

}

// ...............................................................................................

// ...............................................................................................

// Знайти проданий квиток в колекції
function find_sold_ticket (search, sold_tickets_list) {

    let result = [];
    let list = sold_tickets_list;

    search = search.toLowerCase();

    for (let sold_ticket of list) {

        let attributes = [ sold_ticket.passanger.surname,
            sold_ticket.train.number,
            sold_ticket.ticket.number,
            sold_ticket.date];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(sold_ticket);
                break;
            }
        }
    }

    return result;

}


// ...............................................................................................

// Вивести в консоль список проданих квитків
function print_sold_tickets_list (sold_tickets_list) {

    let list = sold_tickets_list;

    console.log("\n" + "Список усіх проданих квитків:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "Пасажир: "  + item.passanger.surname);
        console.log("\t" + "Потяг: "    + item.train.number);
        console.log("\t" + "Квиток: "   + item.ticket.number);
        console.log("\t" + "Дата: "     + item.date);

    }
}

exports.find_most_popular_train    = find_most_popular_train;
exports.find_least_popular_train   = find_least_popular_train;
exports.find_sold_ticket           = find_sold_ticket;
exports.add_sold_ticket            = add_sold_ticket;
exports.remove_sold_ticket         = remove_sold_ticket;
exports.edit_sold_ticket           = edit_sold_ticket;
exports.get_sold_ticket_by_ticket  = get_sold_ticket_by_ticket;
exports.get_sold_tickets_list      = get_sold_tickets_list;
exports.print_sold_tickets_list    = print_sold_tickets_list;
exports.set_sold_tickets_list      = set_sold_tickets_list;
