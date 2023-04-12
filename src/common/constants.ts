export enum SettingIds {
  DISABLE_READ_RECEIPTS = 'disable-read-receipts',
  DISABLE_SEEN_STORY = 'disable-seen-story',
}

export const DefaultSettingValues = {
  [SettingIds.DISABLE_READ_RECEIPTS]: false,
  [SettingIds.DISABLE_SEEN_STORY]: false,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};

export const PayloadNames = {
  SETTING_UPDATE: 'setting:update',
};

export const MemoryRoutes = {
  INDEX: '/',
  SAVE_TRANSCRIPT: '/save-transcript',
};
