// Необхідні змінні
let last_train_id = 0;
let trains_list = new Array();

// Клас - потяг
class Train {

    constructor (name, destination, number) {
    
        this.name = name;
        this.destination = destination;
        this.number = number;
        
        if (name === "" ||
            typeof name      === 'undefined') { this.name      = "Невідома назва"; }
        if (number === "" ||
            typeof number    === 'undefined') { this.number    = "Невідомий номер"; }
        if (destination === "" ||
            typeof destination === 'undefined') { this.destination = "Не встановлено"; }

    }
}

// ...............................................................................................

// Додавання нового потяга
function add_train (name, destination, number) {

    let train = new Train(name, destination, number);
    trains_list.push(train);

    return train;

}

// Видалення потяга з колекції
function remove_train(number) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        if (train.number === number) { trains_list.splice(z, 1);
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Повертаємо список усіх потягів
function get_trains_list()
    { return trains_list; }

// Задаємо список усіх потягів
function set_trains_list (data) {

    if (!data || data.length < 1) { return; }

    for (let element of data) {
        add_train (element.name,
                     element.destination,
                     element.number);
    }
}

// Повертає потяг по його номеру
function get_train_by_number (number) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        if (train.number === number) { return train; }

    }

    return -1;

}

// ...............................................................................................

// Редагувати потяг в колекції
function edit_train (new_name, new_destination, number) {

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];

        if (train.number === number) { train.name = new_name;
                                  train.destination = new_destination;
                                  return 1; }

    }

    return -1;

}

// ...............................................................................................

// Знайти потяг в колекції
function find_train (search) {

    let result = [];
    search = search.toLowerCase();

    for (let train of trains_list) {

        let attributes = [ train.name,
                           train.destination,
                           train.number];

        for (let attr of attributes) {

            if (attr.toLowerCase().includes(search)) { result.push(train);
                                                       break;
            }
        }
    }

    return result;

}

// ...............................................................................................

// Вивести в консоль список потягів
function print_trains_list() {

    console.log("\n" + "Список усіх потягів:");

    for (let z = 0; z < trains_list.length; z++) {

        let train = trains_list[z];
        console.log("\t" + "Назва потяга: "              + train.name);
        console.log("\t" + "Пункт призначення потяга: "  + train.destination);
        console.log("\t" + "Номер: "                     + train.number);

    }
}


exports.find_train      = find_train;
exports.add_train       = add_train;
exports.remove_train    = remove_train;
exports.edit_train      = edit_train;
exports.get_trains_list = get_trains_list;
exports.print_trains_list = print_trains_list;