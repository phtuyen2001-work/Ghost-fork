import Service, {inject as service} from '@ember/service';

export default class AdminsService extends Service {
    @service store;
    @service session;

    _adminIdList = [
        '1',
        '6757bdd2b02e995d6b6a2bc5',
        '6757bdd2b02e995d6b6a2bc6',
        '6757bdd2b02e995d6b6a2bc8'
    ];
    isAdmin = false;

    constructor() {
        super(...arguments);
        this.isAdmin = this._adminIdList.includes(this.session.user.get('id'));
    }

    get adminIdList() {
        return this._adminIdList;
    }
}
