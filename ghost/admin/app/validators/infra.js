import BaseValidator from './base';
import validator from 'validator';
import {isBlank} from '@ember/utils';

export default BaseValidator.create({
    properties: ['name', 'slug'],

    name(model) {
        let name = model.name;

        if (isBlank(name)) {
            model.errors.add('name', 'You must specify a name for the infra.');
            this.invalidate();
        } else if (name.match(/^,/)) {
            model.errors.add('name', 'Infra names can\'t start with commas.');
            this.invalidate();
        } else if (!validator.isLength(name, 0, 191)) {
            model.errors.add('name', 'Infra names cannot be longer than 191 characters.');
            this.invalidate();
        }
    },

    slug(model) {
        let slug = model.slug;

        if (!validator.isLength(slug || '', 0, 191)) {
            model.errors.add('slug', 'URL cannot be longer than 191 characters.');
            this.invalidate();
        }
    }
});
