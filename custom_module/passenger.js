// Клас - пасажир
class Passenger {

    constructor (name, surname, passport) {
    
        this.name = name;
        this.surname = surname;
        this.passport = passport;
    
        if (typeof surname === 'undefined') { this.surname = "Невідомий пасажир"; }
    
    }
    
}

// Додавання нового пасажира
function add_Passenger (name, surname, passport, passengers_list) {

    let passenger = new Passenger(name, surname, passport);
    passengers_list.push(passenger);

    return passenger;

}

// Редагувати пасажира
function edit_Passenger (name, surname, passport, passenger_list, new_name, new_surname, new_passport) {

    let passenger = find_Passenger(name, surname, passport, passenger_list);

    if (passenger === -1) { return -1; }

    let id = passenger_list.indexOf(passenger);
    
    passenger_list[id].name = new_name;
    passenger_list[id].surname = new_surname;
    passenger_list[id].passport = new_passport;
    return 1;

}

// Видалення пасажира
function remove_Passenger (name, surname, passport, passenger_list) {

    let passenger = find_Passenger (name, surname, passport, passenger_list);

    if (passenger === -1) { return -1; }

    let id = passenger_list.indexOf(passenger);
    passenger_list.splice(id, 1);

    return 1;

}

// Знайти пасажира
function find_Passenger (name, surname, passport, passenger_list) {

    for (let id = 0; id < passenger_list.length; id++) {

        let passenger = passenger_list[id];

        if (name === passenger.name &&
            surname === passenger.surname &&
            passport === passenger.passport) { return passenger; }

    }

    return -1;

}

// Отримати список пасажирів
function get_Passenger_List (passenger_list) {

    console.log("\n" + `Список усіх пасажирів`);

    for (let id = 0; id < passenger_list.length; id++) {

        let passenger = passenger_list[id];
        console.log(`\tІм'я пасажира: ${passenger.name}, 
        прізвище: ${passenger.surname},
        номер паспорта: ${passenger.passport}`);


    }

    console.log();
    
    return passenger_list;

}

// Експортуємо функції
exports.find_Passenger      = find_Passenger;
exports.add_Passenger       = add_Passenger;
exports.remove_Passenger    = remove_Passenger;
exports.edit_Passenger      = edit_Passenger;
exports.get_Passenger_List  = get_Passenger_List;
