let Chance = require('chance'),
    chance = new Chance();

const utils = {

    generateRandomApplicants(amount = 20) {

        let people = [];

        for (let i = 0; i < amount; i++) {
            people.push(utils.generateApplicant(
                chance.name(),
                chance.email(),
                chance.phone()
            ));
        }

        return people;
    },

    generateApplicant(name, email, phone) {
        return {
            id: chance.guid(),
            created: Date.now(),
            name,
            email,
            phone
        };
    },

    validateName(name) {
        return /^[A-Za-z\s]+$/.test(name)
    },

    validateEmail(email) {
        let regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regx.test(email.toLowerCase());
    },

    validatePhone(phone) {
        let regx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        return regx.test(phone);
    }
}

module.exports = utils;