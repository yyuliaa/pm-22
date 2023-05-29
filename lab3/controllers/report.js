const trainAllService = require('./../services/train.all')
const ticketAllService = require('./../services/ticket.all')
const {body, validationResult} = require("express-validator/check");
const {sanitizeBody} = require("express-validator/filter");
const passengerAllService = require("../services/passenger.all");
const ticketCreateService = require("../services/ticket.create");

module.exports = {
    index (req, res) {
        res.render('pages/report/index')
    },
    async createReport1Form (req, res) {

        const routes = (await trainAllService()).map(train => train.route.split(":").sort().join(':'))
        const result = []
        for(let cycle = 0; cycle < 3; cycle++){
            if(routes.length === 0){
                break
            }
            let mf = 1;
            let m = 0;
            let item = routes[0];
            for (let i=0; i<routes.length; i++)
            {
                for (let j=i; j<routes.length; j++)
                {
                    if (routes[i] == routes[j])
                        m++;
                    if (mf<m)
                    {
                        mf=m;
                        item = routes[i];
                    }
                }
                m=0;
            }

            result.push(item)

            for(let i = 0; i < routes.length; i++){
                if(routes[i] === item) routes.splice(i,1);
            }
        }
        try {
            res.render('pages/report/most_popular_route', {
                routes: result,
            })
        } catch (error) {
            res.render('pages/report/most_popular_route', {
                routes: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createReport2Form (req, res) {

        const tickets = (await ticketAllService())
            .map(ticket => ({id: ticket.train.toString(), price: ticket.price}))
        const trains = (await trainAllService())
            .filter(train => tickets
                .map(ticket => ticket.id)
                .includes(train.id))
            .map(train => ({id: train.id, route: train.route}))

        const model = tickets.map(ticket => ({
            route: trains.find(train => train.id === ticket.id).route,
            price: ticket.price,
        }))

        const routes = [...new Set(model.map(e => e.route))]

        const process = []

        routes.forEach(route => {
            const prices = model.filter(e => e.route === route).map(e => e.price)
            process.push(
                {
                    route: route,
                    price: prices.reduce((a, b) => a + b, 0)
                }
            )
        })

        const result = process.sort().splice(0,3)

        try {
            res.render('pages/report/most_profitable_route', {
                routes: result
            })
        } catch (error) {
            res.render('pages/report/most_profitable_route', {
                routes: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createReport3Form (req, res) {

        const ticketData = req.query

        const trains = await trainAllService()
        const tickets = (await ticketAllService()).filter(e => e.train.toString()===ticketData.train_id)

        try {
            res.render('pages/report/sold_tickets_on_given_train', {
                trains: trains,
                tickets: tickets,
            })
        } catch (error) {
            res.render('pages/report/sold_tickets_on_given_train', {
                trains: trains,
                tickets: [],
                errors: [{ msg: error.message }]
            })
        }
    },
    async createReport4Form (req, res) {

        const trains = await trainAllService()
        const tickets = await ticketAllService()

        const routes = [...new Set(trains.map(e => e.route.split(":").sort().join(":")))]
        const used_trains = [...new Set(tickets.map(e => e.train.toString()))]
        const used_routes = [...new Set(trains.filter(e => used_trains.includes(e.id)).map(e => e.route.split(":").sort().join(":")))]

        const unused_routes = routes.filter(e => !used_routes.includes(e))

        try {
            res.render('pages/report/routes_without_sold_tickets', {
                routes: unused_routes,
            })
        } catch (error) {
            res.render('pages/report/routes_without_sold_tickets', {
                routes: [],
                errors: [{ msg: error.message }]
            })
        }
    },

}
