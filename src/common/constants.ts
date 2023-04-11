export enum SettingIds {
  READ_RECEIPTS = 'read-receipts',
}

export const DefaultSettingValues = {
  [SettingIds.READ_RECEIPTS]: true,
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
