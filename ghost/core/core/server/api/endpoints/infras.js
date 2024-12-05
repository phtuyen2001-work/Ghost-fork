const models = require('../../models');

/** @type {import('@tryghost/api-framework').Controller} */
const controller = {
    docName: 'infras',

    browse: {
        headers: {
            cacheInvalidate: false
        },
        // why false works?
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
        // data: [
        //     'id',
        //     'slug',
        //     'name'
        // ],
        // why false works?
        permissions: false,
        query(frame) {
            return models.Infra.findOne(frame.data, frame.options)
                .then((model) => {
                    return model;
                });
        }
    }
};

module.exports = controller;
