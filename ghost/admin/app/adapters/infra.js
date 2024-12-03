import ApplicationAdapter from 'ghost-admin/adapters/application';

export default class Infra extends ApplicationAdapter {
    buildURL() {
        const url = super.buildURL(...arguments);

        return url;
    }
}
