import React from 'react';
import { Modal, Button, Text, Checkbox } from '@nextui-org/react';
import { MemoryRouter, Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import SaveTranscript from './SaveTranscript';
import { MemoryRoutes, SettingIds } from '../../../../common/constants';
import useSettingState from '../../../common/hooks/useSettingState';

function ModalWrapper() {
  const navigate = useNavigate();
  return (
    <Modal.Body css={{ padding: '$10' }}>
      <Button light onPress={() => navigate(MemoryRoutes.INDEX)}>
        Better Instagram
      </Button>
      <Outlet />
    </Modal.Body>
  );
}

function ModalContent() {
  const navigate = useNavigate();
  const [checked, setChecked] = useSettingState(SettingIds.READ_RECEIPTS);
  return (
    <div>
      <Text size={14} css={{ margin: 0 }}>
        Save Transcript
      </Text>
      <Button auto onPress={() => navigate(MemoryRoutes.SAVE_TRANSCRIPT)} css={{ mt: '$2' }}>
        Select User
      </Button>
      <Checkbox isSelected={checked} onClick={() => setChecked(!checked)}>
        <Text size={14} css={{ margin: 0 }}>
          Read Reciepts
        </Text>
        <Text size={14} color="#999" css={{ margin: 0 }}>
          When disabled people cannot see when you have read their messages
        </Text>
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
