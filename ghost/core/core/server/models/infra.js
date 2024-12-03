const ghostBookshelf = require('./base');
// const _ = require('lodash');

let Infra;
let Infras;

Infra = ghostBookshelf.Model.extend({
    tableName: 'infras',

    actionsCollectCRUD: true,
    actionsResourceType: 'infra',

    format(options) {
        const attrs = ghostBookshelf.Model.prototype.format.call(this, options);

        return attrs;
    },

    parse() {
        const attrs = ghostBookshelf.Model.prototype.parse.apply(this, arguments);

        return attrs;
    },

});

Infras = ghostBookshelf.Collection.extend({
    model: Infra
});

// console.log('BEEPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP')
// new Infras({id: '00001'}).fetch().then((infra) => {
//     console.log(infra);
// }).catch((error) => {
//     console.error(error);
// });

module.exports = {
    Infra: ghostBookshelf.model('Infra', Infra),
    Infras: ghostBookshelf.collection('Infras', Infras)
};
