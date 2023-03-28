// Підключаємо необхідні файли
const train = require("./train");
const passenger = require("./passenger");
const ticket  = require("./ticket");
const sold_ticket  = require("./sold_ticket");

// Доступні операції з потягами
exports.find_train           = train.find_train;
exports.add_train            = train.add_train;
exports.remove_train         = train.remove_train;
exports.edit_train           = train.edit_train;
exports.get_trains_list      = train.get_trains_list;
exports.print_trains_list    = train.print_trains_list;

// Доступні операції з пасажирами
exports.find_Passenger         = passenger.find_Passenger ;
exports.add_Passenger          = passenger.add_Passenger ;
exports.remove_Passenger       = passenger.remove_Passenger ;
exports.edit_Passenger         = passenger.edit_Passenger ;
exports.get_Passenger_List     = passenger.get_Passenger_List;

// Доступні операції з квитками
exports.find_ticket            = ticket.find_ticket;
exports.add_ticket             = ticket.add_ticket;
exports.remove_ticket          = ticket.remove_ticket;
exports.get_ticket_by_number   = ticket.get_ticket_by_number;
exports.get_tickets_list       = ticket.get_tickets_list;
exports.print_tickets_list     = ticket.print_tickets_list;
exports.set_tickets_list       = ticket.set_tickets_list;

// Доступні операції з проданими квитками
exports.find_most_popular_train    = sold_ticket.find_most_popular_train;
exports.find_least_popular_train   = sold_ticket.find_least_popular_train;
exports.find_sold_ticket           = sold_ticket.find_sold_ticket;
exports.add_sold_ticket            = sold_ticket.add_sold_ticket;
exports.edit_sold_ticket           = sold_ticket.edit_sold_ticket;
exports.remove_sold_ticket         = sold_ticket.remove_sold_ticket;
exports.get_sold_ticket_by_ticket  = sold_ticket.get_sold_ticket_by_ticket;
exports.get_sold_tickets_list      = sold_ticket.get_sold_tickets_list;
exports.print_sold_tickets_list    = sold_ticket.print_sold_tickets_list;
exports.set_sold_tickets_list      = sold_ticket.set_sold_tickets_list;

