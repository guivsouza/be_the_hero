const express = require('express')
const { celebrate, Segments, Joi} = require('celebrate')

const OngController = require('./controllers/OngControllers')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const {createOngSchema} = require('../src/validation/schemas/ongSchema')


const routes = express.Router()

routes.post('/sessions', celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required()
        })
    }), SessionController.create)

routes.get('/ongs', OngController.index)

routes.post('/ongs', celebrate({
    [Segments.BODY]: createOngSchema
    }), OngController.create)

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
        }).unknown()
    }), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number()
        })
    }),IncidentController.index)

routes.post('/incidents', celebrate({
    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required()    
        }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
        }).unknown()
    }), IncidentController.create)

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
      })
    }),IncidentController.delete)




module.exports = routes