import Component from '@ember/component';
import classic from 'ember-classic-decorator';
import {action, computed} from '@ember/object';
import {inject as service} from '@ember/service';
import {sort} from '@ember/object/computed';
import {tagName} from '@ember-decorators/component';

@classic
@tagName('')
export default class GhPsmInfrasSelect extends Component {
    @service store;

    // public attrs
    post = null;

    // internal attrs
    _availableInfras = null;

    @sort('_availableInfras.[]', function (a, b) {
        return a.name.localeCompare(b.name, undefined);
    })
        availableInfras;

    @computed('availableInfras.@each.name')
    get availableInfraNames() {
        return this.availableInfras.map(i => i.name.toLowerCase());
    }

    init() {
        super.init(...arguments);
        // to a live-query that will be immediately populated with what's in the
        // store and be updated when the above query returns
        this.store.query('infra', {limit: 'all'});
        this.set('_availableInfras', this.store.peekAll('infra'));
    }

    @action
    updateInfras(infras) {
        // console.log('new infras', infras);
        // console.log('current infras', this.get('post.infras'));
        this.set('post.infras', infras);
        if (this.savePostOnChange) {
            return this.savePostOnChange();
        }
    }
}
