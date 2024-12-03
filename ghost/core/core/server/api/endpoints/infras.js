const tpl = require('@tryghost/tpl');
const errors = require('@tryghost/errors');
const models = require('../../models');

/** @type {import('@tryghost/api-framework').Controller} */
const controller = {
    docName: 'infras',

    browse: {
        headers: {
            cacheInvalidate: false
        },
        validation: { },
        permissions: false,
        query(frame) {
            return models.Infra.findPage(frame.options);
        }
    },

    read: {
        headers: {
            cacheInvalidate: false
        },
        // options: [
        //     'include',
        //     'filter',
        //     'fields',
        //     'debug'
        // ],
        data: [
            'id',
            'slug',
            'name'
        ],
        validation: {},
        permissions: false,
        query(frame) {
            return models.Infra.findOne(frame.data, frame.options)
                .then((model) => {
                    // if (!model) {
                    //     return Promise.reject(new errors.NotFoundError({
                    //         message: tpl('Infra not found.')
                    //     }));
                    // }

                    return model;
                });
        }
    }
};

module.exports = controller;
