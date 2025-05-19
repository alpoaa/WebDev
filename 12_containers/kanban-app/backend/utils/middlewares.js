const logger = require('../utils/logger')

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'Unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    
    logger.error(error.message)

    switch(error.name) {
        case 'CastError':
            return response.status(400).send({ error: 'Malformatted Id given' })
    }
     
    next(error)
}

module.exports = {
    unknownEndpoint,
    errorHandler
}