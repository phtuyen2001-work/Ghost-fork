import Component from '@glimmer/component';
import {action} from '@ember/object';
import {formatPostTime} from 'ghost-admin/helpers/gh-format-post-time';
import {inject as service} from '@ember/service';
import {tracked} from '@glimmer/tracking';

export default class PostsListItemClicks extends Component {
    @service feature;
    @service session;
    @service settings;

    @tracked isHovered = false;

    get post() {
        return this.args.post;
    }

    get firstInfra() {
        if (this.post.infras && this.post.infras.length > 0) {
            return this.post.infras.objectAt(0);
        }
        return null;
    }

    get errorClass() {
        if (this.post.didEmailFail) {
            return 'error';
        }
        return '';
    }

    get scheduledText() {
        let text = [];

        let formattedTime = formatPostTime(
            this.post.publishedAtUTC,
            {timezone: this.settings.timezone, scheduled: true}
        );
        text.push(formattedTime);

        return text.join(' ');
    }

    @action
    mouseOver() {
        this.isHovered = true;
    }

    @action
    mouseLeave() {
        this.isHovered = false;
    }
}
