export enum SettingIds {
  SAVE_TRANSCRIPT_BUTTON = 'save-transcript-button',
}

export const DefaultSettingValues = {
  [SettingIds.SAVE_TRANSCRIPT_BUTTON]: true,
};

export const EventTypes = {
  SETTING_UPDATE: 'setting:update',
};

export const PayloadNames = {
  SETTING_UPDATE: 'setting:update',
};

export const MemoryRoutes = {
  SAVE_TRANSCRIPT: '/save-transcript',
};
