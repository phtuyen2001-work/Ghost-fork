import Model, {attr} from '@ember-data/model';
import ValidationEngine from 'ghost-admin/mixins/validation-engine';

export default Model.extend(ValidationEngine, {
    validationType: 'infra',

    name: attr('string'),
    slug: attr('string')
});
