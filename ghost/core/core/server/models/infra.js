const ghostBookshelf = require('./base');
// const _ = require('lodash');

let Infra;
let Infras;

Infra = ghostBookshelf.Model.extend({
    tableName: 'infras',

    actionsCollectCRUD: true,
    actionsResourceType: 'infra',

    posts: function posts() {
        return this.belongsToMany('Post');
    },

    format(options) {
        const attrs = ghostBookshelf.Model.prototype.format.call(this, options);

        return attrs;
    },

    parse() {
        const attrs = ghostBookshelf.Model.prototype.parse.apply(this, arguments);

        return attrs;
    },

    toJSON: function toJSON(unfilteredOptions) {
        const options = Infra.filterOptions(unfilteredOptions, 'toJSON');
        const attrs = ghostBookshelf.Model.prototype.toJSON.call(this, options);

        return attrs;
    },

    defaultColumnsToFetch() {
        return ['id'];
    }
}, {

    // countRelations() {
    //     return {
    //         posts(modelOrCollection, options) {
    //             console.log('countRelations in infra')
    //             modelOrCollection.query('columns', 'infras.*', (qb) => {
    //                 qb.count('posts.id')
    //                     .from('posts')
    //                     .join('posts_infras', 'posts.id', 'posts_infras.post_id')
    //                     .whereRaw('posts_infras.infra_id = infras.id')
    //                     .as('count__posts');
    //                 // if (options.context && options.context.public) {
    //                 //     // @TODO use the filter behavior for posts
    //                 //     qb.andWhere('posts.type', '=', 'post');
    //                 //     qb.andWhere('posts.status', '=', 'published');
    //                 // }
    //             });
    //         }
    //     };
    // },
});

Infras = ghostBookshelf.Collection.extend({
    model: Infra
});

module.exports = {
    Infra: ghostBookshelf.model('Infra', Infra),
    Infras: ghostBookshelf.collection('Infras', Infras)
};
