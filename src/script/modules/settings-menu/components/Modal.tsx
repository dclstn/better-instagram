import React from 'react';
import { Modal, Button, Text, Checkbox, Divider } from '@nextui-org/react';
import { MemoryRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import SaveTranscript from './SaveTranscript';
import { MemoryRoutes, SettingIds } from '../../../../common/constants';
import useSettingState from '../../../common/hooks/useSettingState';
import styles from './Modal.module.css';

function ModalWrapper() {
  return (
    <Modal.Body css={{ padding: '$10' }}>
      <Outlet />
    </Modal.Body>
  );
}

function ReadReceipts() {
  const [checked, setChecked] = useSettingState(SettingIds.DISABLE_READ_RECEIPTS);
  return (
    <Checkbox isSelected={checked} onClick={() => setChecked(!checked)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Disable Message Receipts
        </Text>
        <Text size={14} color="#999" css={{ margin: 0, fontWeight: '400' }}>
          Others cannot see you have read their message.
        </Text>
      </div>
    </Checkbox>
  );
}

function SeenStory() {
  const [checked, setChecked] = useSettingState(SettingIds.DISABLE_SEEN_STORY);
  return (
    <Checkbox isSelected={checked} onClick={() => setChecked(!checked)}>
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Disable Seen Story
        </Text>
        <Text size={14} color="#999" css={{ margin: 0, fontWeight: '400' }}>
          Others cannot see you have viewed their story.
        </Text>
      </div>
    </Checkbox>
  );
}

function ModalContent() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.settings}>
        <ReadReceipts />
        <SeenStory />
      </div>
      <Divider css={{ mt: '$10', mb: '$10' }} />
      <div className={styles.checkboxLabel}>
        <Text size={14} css={{ margin: 0 }}>
          Save Transcript
        </Text>
        <Text size={14} color="#999" css={{ margin: 0, fontWeight: '400' }}>
          Save a copy of your chat history.
        </Text>
      </div>
      <Button
        size="sm"
        flat
        auto
        onPress={() => navigate(MemoryRoutes.SAVE_TRANSCRIPT)}
        css={{ mt: '$4' }}
        iconRight={<FontAwesomeIcon icon={faCaretRight} />}
      >
        Save Transcript
      </Button>
    </div>
  );
}

export default function App({ visible, closeHandler }: { visible: boolean; closeHandler: () => void }) {
  return (
    <Modal aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<ModalWrapper />}>
            <Route index element={<ModalContent />} />
            <Route path={MemoryRoutes.SAVE_TRANSCRIPT} element={<SaveTranscript />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </Modal>
  );
}
