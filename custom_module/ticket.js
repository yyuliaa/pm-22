// Необхідні змінні
let last_ticket_number = 0;
let tickets_list = new Array();

// Клас - квиток
class Ticket {

    // Конструктор класу
    constructor (number, price) {
    
        this.number = number;
        this.price = price;

        
        if (number === "" ||
            typeof number       === 'undefined') { this.number       = ++last_ticket_number;   }
        if (price === "" ||
            typeof price      === 'undefined') { this.price      = "Не встановлено";    }

    
    }
}

// ...............................................................................................

// Додавання нового квитка
function add_ticket (number, price) {

    let ticket = new Ticket(number, price);
    tickets_list.push(ticket);

    return ticket;

}


// Видалення квитка з колекції
function remove_ticket (number) {

    for (let z = 0; z < tickets_list.length; z++) {

        let ticket = tickets_list[z];
        if (ticket.number === number) {
                                 tickets_list.splice(z, 1);
                                 return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх квитків
function get_tickets_list () {

    return tickets_list;

}

// Задаємо список усіх квитків
function set_tickets_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
                        add_ticket(element.number,
                        element.price);
        }
}

// Повертає квиток по його номеру
function get_ticket_by_number (number) {

    let list = tickets_list;

    for (let z = 0; z < list.length; z++) {

        let ticket = list[z];
        if (ticket.number === number) { return ticket; }

    }

    return -1;

}

// ...............................................................................................

// ...............................................................................................

// Знайти квиток в колекції
function find_ticket (search) {

    let result = [];
    let list = tickets_list;

    search = search.toLowerCase();

    for (let ticket of list) {

        let attributes = [ ticket.number,
            ticket.price];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(ticket);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список квитків
function print_tickets_list () {

    let list = tickets_list;

    console.log("\n" + "Список усіх квитків:");

    for (let z = 0; z < list.length; z++) {

        let item = list[z];
        console.log("\t" + "Номер: " + item.number);
        console.log("\t" + "Ціна: "  + item.price);

    }
}


exports.find_ticket           = find_ticket;
exports.add_ticket            = add_ticket;
exports.remove_ticket         = remove_ticket;
exports.get_ticket_by_number  = get_ticket_by_number;
exports.get_tickets_list      = get_tickets_list;
exports.print_tickets_list    = print_tickets_list;
exports.set_tickets_list      = set_tickets_list;