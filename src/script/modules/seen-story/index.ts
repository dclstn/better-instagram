import { EventTypes, SettingIds } from '../../../common/constants';
import settings from '../../lib/settings';
import { registerMiddleware, unregisterMiddleware } from '../../lib/http-middleware';

const regex = /\/stories\/reel\/seen/;

function handleRequest(method: string, url: URL | string): boolean {
  if (method !== 'POST') {
    return true;
  }
  const urlString = typeof url === 'string' ? url : url.toString();
  return !regex.test(urlString);
}

class DisableSeenStory {
  private middlewareId: string | null;

  constructor() {
    this.middlewareId = null;
    this.load();
    settings.on(`${SettingIds.DISABLE_SEEN_STORY}.${EventTypes.SETTING_UPDATE}`, this.load);
  }

  load() {
    const enabled = settings.getSetting(SettingIds.DISABLE_SEEN_STORY);
    if (!enabled && this.middlewareId != null) {
      unregisterMiddleware(this.middlewareId);
      this.middlewareId = null;
    }
    if (enabled && this.middlewareId == null) {
      this.middlewareId = registerMiddleware(handleRequest);
    }
  }
}

export default new DisableSeenStory();
