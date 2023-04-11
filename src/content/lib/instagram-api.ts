/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const ApiRoutes = {
  INBOX: '/direct_v2/inbox/',
  THREADS: (threadId: string) => `/direct_v2/threads/${threadId}/`,
};

let instagramAppId: string | null = null;
function getInstagramAppId() {
  if (instagramAppId != null) {
    return instagramAppId;
  }
  const foundKey = Object.keys(window.localStorage).find((key) => key.startsWith('bz:'));
  if (foundKey == null) {
    throw new Error('Could not find Instagram App ID in local storage');
  }
  const value = window.localStorage.getItem(foundKey) as any;
  for (const batch of JSON.parse(value)) {
    for (const item of batch) {
      // eslint-disable-next-line no-prototype-builtins
      if (item.hasOwnProperty('appID')) {
        instagramAppId = item.appID;
        return item.appID;
      }
    }
  }
  throw new Error('Could not find Instagram App ID in local storage');
}

const client = axios.create({
  baseURL: 'https://www.instagram.com/api/v1/',
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  const newConfig = config;
  newConfig.headers['X-IG-App-ID'] = getInstagramAppId();
  return newConfig;
});

export async function getInbox(): Promise<any> {
  return client.get(ApiRoutes.INBOX);
}

export async function getThread(threadId: string, cursor?: string): Promise<any> {
  return client.get(ApiRoutes.THREADS(threadId), { params: { cursor } });
}

export default client;
