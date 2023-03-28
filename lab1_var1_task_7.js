const mod = require('./custom_module');

// Додавання потягів
let h1 = mod.add_train("Train_1", "Kyiv", "243");
let h2 = mod.add_train("Train_2", "Lviv", "786");
let h3 = mod.add_train("Train_3", "Ternopil", "554");

// Список потягів
mod.print_trains_list();

// Видалення потягів
console.log("Видалення потяга: Train_2");
mod.remove_train("786");

// Список потягів
mod.print_trains_list();

// Зміна потягів
console.log("Зміна потяга: Train_3");
mod.edit_train("Train_3", "Rivne", "554");

// Список потягів
mod.print_trains_list();

// Пошук потягів
let tr1 = mod.find_train("Train_1");
console.log(`Пошук потяга Train_1: ${tr1.length !== 0 ? "знайдено" : "не знайдено"}`);
let tr2 = mod.find_train("Train_7");
console.log(`Пошук потяга Train_7: ${tr2.length !== 0 ? "знайдено" : "не знайдено"}`);
let tr3 = mod.find_train("Train_3");
console.log(`Пошук потяга Train_3: ${tr3.length !== 0 ? "знайдено" : "не знайдено"}`);
////////////////////////////////////////////////////////////////////////////////////


let passengers_list = [];

// Додавання пасажирів
mod.add_Passenger("Anna", "Tereshchuk", "AR237655", passengers_list);
mod.add_Passenger("Igor", "Demkiv", "HY674890", passengers_list);
mod.add_Passenger("Karina", "Savenko", "KJ456639", passengers_list);
mod.add_Passenger("Pavlo", "Zaharenko", "AA677833", passengers_list);

// Список пасажирів
mod.get_Passenger_List(passengers_list);

// Видалення пасажирів
console.log("Видалення пасажира: Karina Savenko");
mod.remove_Passenger("Karina", "Savenko", "KJ456639", passengers_list);

// Список пасажирів
mod.get_Passenger_List(passengers_list);

// Редагування пасажирів
console.log("Редагування пасажира: Igor Demkiv");
mod.edit_Passenger("Igor", "Demkiv", "HY674890", passengers_list, "Ivan", "Demchuk", "HG674899");

// Список пасажирів
mod.get_Passenger_List(passengers_list);

// Пошук пасажирів
let pas1 = mod.find_Passenger("Anna", "Tereshchuk", "AR237655", passengers_list);
console.log(`Пошук пасажира - Anna Tereshchuk: ${pas1 !== -1 ? "знайдено" : "не знайдено"}`);
let pas2 = mod.find_Passenger("Igor", "Demkiv", "HY674890", passengers_list);
console.log(`Пошук пасажира - Igor Demkiv: ${pas2 !== -1 ? "знайдено" : "не знайдено"}`);
let pas3 = mod.find_Passenger("Pavlo", "Zaharenko", "AA677833", passengers_list);
console.log(`Пошук пасажира - Pavlo Zaharenko: ${pas3 !== -1 ? "знайдено" : "не знайдено"}`);
////////////////////////////////////////////////////////////////////////////////////

let sold_tickets_list = [];

// Додавання квитків
mod.add_ticket("2778", "400 грн");
mod.add_ticket("4467", "260 грн");
mod.add_ticket("8889", "534 грн");
mod.add_ticket("8955", "560 грн");
mod.add_ticket("1322", "400 грн");
//пошук квитка
let tick1 = mod.find_ticket("2778", "400 грн");
mod.add_sold_ticket(pas1, tr1[0], tick1[0], "2023-04-01", sold_tickets_list);
let tick2 = mod.find_ticket("4467", "260 грн");
mod.add_sold_ticket(pas3, tr1[0], tick2[0], "2023-03-30", sold_tickets_list);
let tick3 = mod.find_ticket("8889", "534 грн");
mod.add_sold_ticket(pas3, tr1[0], tick3[0], "2023-03-30", sold_tickets_list);
let tick4 = mod.find_ticket("8955", "560 грн");
mod.add_sold_ticket(pas3, tr1[0], tick4[0], "2023-04-02", sold_tickets_list);
let tick5 = mod.find_ticket("1322", "400 грн");
mod.add_sold_ticket(pas3, tr1[0], tick5[0], "2023-04-03", sold_tickets_list);
//список проданих квитків
mod.print_sold_tickets_list(sold_tickets_list);

//зміна квитка із одного потяга на інший
mod.edit_sold_ticket(tick2[0], sold_tickets_list, tr3[0]);

//список проданих квитків
mod.print_sold_tickets_list(sold_tickets_list);

// Список квитків у потязі
//mod.get_tickets_list();

//Cкасування покупки квитка
mod.remove_sold_ticket(tick1[0], sold_tickets_list);

//список проданих квитків
mod.print_sold_tickets_list(sold_tickets_list);

//сортування списку проданих квитків за номером потяга
let most_popular_train = mod.find_most_popular_train(sold_tickets_list);
console.log("Найпопулярніший потяг ", most_popular_train);

//сортування списку проданих квитків за номером потяга, пошук найменш популярного потяга
let least_popular_train = mod.find_least_popular_train(sold_tickets_list);
console.log("Найменш популярний потяг ", least_popular_train);

//список проданих квитків
mod.print_sold_tickets_list(sold_tickets_list);

// Вилучення квитка
console.log("Вилучення квитка: 2777");
mod.remove_ticket("2777");

// Список квитків у потязі
mod.get_tickets_list();

// Пошук квитків
let tick12 = mod.find_ticket("2778");
console.log(`Пошук квитка - 2778: ${tick12.length !== 0 ? "знайдено" : "не знайдено"}`);
//let pat2 = mod.find_Patient("О. Біда", 32, hosp1);
//console.log(`Пошук пацієнта - О. Біда: ${hosp2 !== -1 ? "знайдено" : "не знайдено"}`);

