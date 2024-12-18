import Service, {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class AdminsService extends Service {
    @service store;
    @service session;

    @tracked _adminIdList = [];

    constructor() {
        super(...arguments);
    }

    get isAdmin() {
        return this._adminIdList.includes(this.session.user.get('id'));
    }

    get adminIdList() {
        return this._adminIdList;
    }

    set adminIdList(ids) {
        this._adminIdList = [...ids];
    }
}
