import PostsController from './posts';
import {action} from '@ember/object';
import {inject as service} from '@ember/service';

export default class PostsAdminController extends PostsController {
    @service admins;

    // default values for these are set in constructor and defined in `helpers/reset-query-params`

    constructor() {
        super(...arguments);
    }

    get availableAdmins() {
        const users = this._availableAuthors.toArray();
        const filtered = users.filter(u => this.admins.adminListIds.includes(u.get('id')));

        filtered.unshift({name: 'All authors', slug: null});

        return filtered;
    }

    get selectedAuthor() {
        let author = this.author;
        let admins = this.availableAdmins;

        return admins.findBy('slug', author) || {slug: '!unknown'};
    }

    @action
    changeAuthor(author) {
        this.author = author.slug;
    }
}
