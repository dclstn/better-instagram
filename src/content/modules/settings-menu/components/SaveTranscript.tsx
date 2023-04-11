/* eslint-disable camelcase */
import { Avatar, Button, Checkbox, Dropdown, Loading, Text } from '@nextui-org/react';
import React from 'react';
import useApi from '../../../common/hooks/useAPI';
import { getInbox, getThread } from '../../../lib/instagram-api';
import styles from './Checkbox.module.css';

enum FilterTypes {
  TEXT = 'text',
  CLIP = 'clip',
  ACTION = 'action_log',
  MEDIA = 'media',
  MEDIA_SHARE = 'media_share',
  REEL_SHARE = 'reel_share',
  STORY = 'story_share',
  RAVEN = 'raven_media',
  VIDEO_CALL_EVENT = 'video_call_event',
  LINK = 'link',
}

interface Filter {
  [FilterTypes.TEXT]: boolean;
  [FilterTypes.CLIP]: boolean;
  [FilterTypes.ACTION]: boolean;
  [FilterTypes.MEDIA]: boolean;
  [FilterTypes.MEDIA_SHARE]: boolean;
  [FilterTypes.REEL_SHARE]: boolean;
  [FilterTypes.STORY]: boolean;
  [FilterTypes.RAVEN]: boolean;
  [FilterTypes.VIDEO_CALL_EVENT]: boolean;
  [FilterTypes.LINK]: boolean;
}

const DEFAULT_FILTER: Filter = {
  [FilterTypes.TEXT]: true,
  [FilterTypes.CLIP]: false,
  [FilterTypes.ACTION]: false,
  [FilterTypes.MEDIA]: false,
  [FilterTypes.MEDIA_SHARE]: false,
  [FilterTypes.REEL_SHARE]: false,
  [FilterTypes.STORY]: false,
  [FilterTypes.RAVEN]: false,
  [FilterTypes.VIDEO_CALL_EVENT]: false,
  [FilterTypes.LINK]: false,
};

enum FileFormat {
  JSON = 'json',
  TXT = 'txt',
}

function getUserFromThread(thread: any, userId: any) {
  const user = thread.users.find(
    // eslint-disable-next-line no-underscore-dangle
    (u: any) => u.pk === userId || u.pk_id === userId || u.strong_id__ === userId,
  );
  if (user == null) {
    return null;
  }
  return {
    userId,
    username: user.username,
    fullName: user.full_name,
    profilePicture: user.profile_pic_url,
  };
}

export default function SaveTranscript() {
  const { data, loading } = useApi(getInbox);
  const [selected, setSelected] = React.useState(new Set());
  const [totalItems, setTotalItems] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);
  const [filter, setFilter] = React.useState<Filter>(DEFAULT_FILTER);
  const [fileFormat, setFileFormat] = React.useState<Set<FileFormat>>(new Set([FileFormat.JSON]));

  const threads = React.useMemo(() => {
    if (data == null) {
      return [];
    }
    const tempThreads = [];
    for (const thread of data.inbox.threads) {
      const title = thread.thread_title;
      const threadPicture = thread.users[0].profile_pic_url;
      const threadId = thread.thread_id;
      tempThreads.push({ threadId, title, threadPicture });
    }
    return tempThreads;
  }, [data]);

  const selectedThread = React.useMemo(() => {
    if (data == null) {
      return null;
    }
    const threadId = Array.from(selected)[0];
    return threads.find((thread) => thread.threadId === threadId);
  }, [data, selected]);

  const downloadData = React.useCallback(
    (filename: string, saveData: string) => {
      const ext = fileFormat.has(FileFormat.TXT) ? 'txt' : 'json';
      const blob = new Blob([saveData], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.${ext}`);
      link.click();
    },
    [fileFormat],
  );

  const saveTranscript = React.useCallback(
    async (currentData?: Array<any>, cursor?: string) => {
      if (cursor == null) {
        setFetching(true);
        setTotalItems(0);
      }
      if (selectedThread == null) {
        return;
      }
      const { threadId } = selectedThread;
      const { data: threadData } = await getThread(threadId, cursor);
      const { oldest_cursor } = threadData.thread;
      const items = [];
      for (const item of threadData.thread.items) {
        const itemTypeFilter = filter[item.item_type as FilterTypes];
        if (itemTypeFilter == null || itemTypeFilter === false) {
          continue;
        }
        const user = getUserFromThread(threadData.thread, item.user_id);
        if (user != null) {
          item.user = user;
        }
        if (fileFormat.has(FileFormat.TXT)) {
          const timestamp = new Date(item.timestamp * 0.001).toLocaleString();
          const line = `${timestamp}\t${item.user?.username ?? 'me'}: ${item.text}`;
          items.push(line);
        } else {
          items.push(item);
        }
      }
      setTotalItems((prev) => prev + items.length);
      const newData = currentData == null ? items : [...currentData, ...items];
      if (oldest_cursor == null || oldest_cursor === 'MIN_CURSOR') {
        setFetching(false);
        const saveData = fileFormat.has(FileFormat.TXT) ? newData.join('\n') : JSON.stringify(newData);
        downloadData(threadId, saveData);
        return;
      }
      await saveTranscript(newData, oldest_cursor);
    },
    [selectedThread, filter, fileFormat],
  );

  const noFilters = Object.values(filter).every((value) => value === false);
  const isDisabled = selectedThread == null || noFilters || fetching || loading;

  return (
    <div className={styles.box}>
      <div>
        <Text size={14} css={{ margin: 0 }}>
          Select a Thread
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Select a thread to save the transcript to.
        </Text>
      </div>
      <Dropdown placement="bottom-left" disableAnimation>
        <Dropdown.Button disabled={loading} auto bordered icon={undefined}>
          {loading ? <Loading type="points-opacity" color="currentColor" size="sm" /> : null}
          {!loading && selectedThread?.title == null ? 'Select User' : selectedThread?.title}
        </Dropdown.Button>
        <Dropdown.Menu
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selected as Set<string>}
          onSelectionChange={(keys) => setSelected(keys as Set<string>)}
        >
          {threads.map(({ threadId, threadPicture, title }) => (
            <Dropdown.Item key={threadId} css={{ display: 'flex' }}>
              <div className={styles.dropdownItem}>
                <Avatar src={threadPicture} size="sm" css={{ mr: '$2' }} />
                {title}
              </div>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <Text size={14} css={{ margin: 0 }}>
          Configuration
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          Configure what content will be saved.
        </Text>
      </div>
      <div className={styles.checkboxContainer}>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.TEXT]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.TEXT]: !prev[FilterTypes.TEXT] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Chat Messages
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.CLIP]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.CLIP]: !prev[FilterTypes.CLIP] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Clips
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.ACTION]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.ACTION]: !prev[FilterTypes.ACTION] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Reactions
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.MEDIA]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.MEDIA]: !prev[FilterTypes.MEDIA] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Images and Videos
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.LINK]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.LINK]: !prev[FilterTypes.LINK] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Links
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.MEDIA_SHARE]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.MEDIA_SHARE]: !prev[FilterTypes.MEDIA_SHARE] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Media Share
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.REEL_SHARE]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.REEL_SHARE]: !prev[FilterTypes.REEL_SHARE] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Reel Shares
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.STORY]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.STORY]: !prev[FilterTypes.STORY] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Stories
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.VIDEO_CALL_EVENT]}
          onChange={() =>
            setFilter((prev) => ({ ...prev, [FilterTypes.VIDEO_CALL_EVENT]: !prev[FilterTypes.VIDEO_CALL_EVENT] }))
          }
        >
          <Text size={14} css={{ margin: 0 }}>
            Video Call Events
          </Text>
        </Checkbox>
        <Checkbox
          size="sm"
          isSelected={filter[FilterTypes.RAVEN]}
          onChange={() => setFilter((prev) => ({ ...prev, [FilterTypes.RAVEN]: !prev[FilterTypes.RAVEN] }))}
        >
          <Text size={14} css={{ margin: 0 }}>
            Raven Media
          </Text>
        </Checkbox>
      </div>
      <Dropdown placement="bottom-left" disableAnimation>
        <Dropdown.Button auto bordered icon={undefined}>
          {fileFormat.has(FileFormat.JSON) ? 'JSON' : 'TXT'}
        </Dropdown.Button>
        <Dropdown.Menu
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={fileFormat as Set<string>}
          onSelectionChange={(keys) => setFileFormat(keys as Set<FileFormat>)}
        >
          <Dropdown.Item key={FileFormat.JSON}>JSON</Dropdown.Item>
          <Dropdown.Item key={FileFormat.TXT}>TXT</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button onClick={() => saveTranscript()} disabled={isDisabled}>
        {fetching ? `Saving ${totalItems} items...` : 'Save Transcript'}
      </Button>
    </div>
  );
}
