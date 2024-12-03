import Model, {attr} from '@ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';
import {inject as service} from '@ember/service';

export default Model.extend(ValidationEngine, {
    service: service(),

    validationType: 'infra',

    name: attr('string'),
    slug: attr('string')
});
