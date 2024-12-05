const jsonSchema = require('../utils/json-schema');
const models = require('../../../../../models');
const {ValidationError} = require('@tryghost/errors');
const tpl = require('@tryghost/tpl');

const messages = {
    invalidVisibilityFilter: 'Invalid filter in visibility_filter property',
    onlySingleContentSource: 'Posts can have either a mobiledoc or a lexical property, never both.',
    onlySingleContentSourceContext: 'Both the mobiledoc and lexical properties are set, one must be null',
    onlySingleContentSourceHelp: 'https://ghost.org/docs/admin-api/#the-post-object'
};

const validateVisibility = async function (frame) {
    if (!frame.data.posts || !frame.data.posts[0]) {
        return Promise.resolve();
    }

    // validate visibility - not done at schema level because this can be an NQL query so needs model access
    const visibility = frame.data.posts[0].visibility;
    const visibilityFilter = frame.data.posts[0].visibility_filter;
    if (visibility) {
        if (!['public', 'members', 'paid', 'tiers'].includes(visibility)) {
            // check filter is valid
            try {
                await models.Member.findPage({filter: visibilityFilter, limit: 1});
                return Promise.resolve();
            } catch (err) {
                return Promise.reject(new ValidationError({
                    message: tpl(messages.invalidVisibilityFilter),
                    property: 'visibility_filter'
                }));
            }
        }

        return Promise.resolve();
    }
};

const validateSingleContentSource = async function (frame) {
    if (!frame.data.posts?.[0]) {
        return;
    }

    const [post] = frame.data.posts;
    if (post.mobiledoc && post.lexical) {
        return Promise.reject(new ValidationError({
            message: tpl(messages.onlySingleContentSource),
            context: tpl(messages.onlySingleContentSourceContext),
            help: tpl(messages.onlySingleContentSourceHelp),
            property: 'lexical'
        }));
    }
};

const saveInfrasProp = (posts) => {
    const infras = [];
    if (posts) {
        posts.forEach((p) => {
            infras.push(p.infras);
        });
    }
    return infras;
};

// THIS WILL MUTATE DIRECTLY ON THE OBJECT/ARRAY
const injectInfrasProp = (posts, infras) => {
    for (let i = 0; i < posts.length; i++) {
        posts[i].infras = infras[i];
    }
};

// the validation removes infras prop
// so need to manually inject it
module.exports = {
    async add(apiConfig, frame) {
        const savedInfras = saveInfrasProp(frame.data.posts);
        await jsonSchema.validate(...arguments);
        await validateVisibility(frame);
        await validateSingleContentSource(frame);
        injectInfrasProp(frame.data.posts, savedInfras);
    },
    async edit(apiConfig, frame) {
        const savedInfras = saveInfrasProp(frame.data.posts);
        await jsonSchema.validate(...arguments);
        await validateVisibility(frame);
        await validateSingleContentSource(frame);
        injectInfrasProp(frame.data.posts, savedInfras);
    }
};
