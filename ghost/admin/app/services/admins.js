import Service, {inject as service} from '@ember/service';

export default class AdminsService extends Service {
    @service store;
    @service session;

    _adminIdList = [
        '1',
        '675bef0e081313d5a9dec960',
        '675bef0e081313d5a9dec961',
        '675bef0e081313d5a9dec963'
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
