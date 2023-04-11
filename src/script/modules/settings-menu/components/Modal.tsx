import React from 'react';
import { Modal, Button, Text, Checkbox, Divider } from '@nextui-org/react';
import { MemoryRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
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

function ModalContent() {
  const navigate = useNavigate();
  const [checked, setChecked] = useSettingState(SettingIds.DISABLE_READ_RECEIPTS);
  return (
    <div>
      <Text size={14} css={{ margin: 0 }}>
        Save Transcript
      </Text>
      <Button flat auto onPress={() => navigate(MemoryRoutes.SAVE_TRANSCRIPT)} css={{ mt: '$2' }}>
        Select User
      </Button>
      <Divider />
      <Checkbox isSelected={checked} onClick={() => setChecked(!checked)}>
        <div className={styles.checkboxLabel}>
          <Text size={14} css={{ margin: 0 }}>
            Disable Message Receipts
          </Text>
        </div>
      </Checkbox>
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
