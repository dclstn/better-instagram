import React from 'react';
import { Modal, Button, Text } from '@nextui-org/react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import SaveTranscript from './SaveTranscript';
import { MemoryRoutes } from '../../../../common/constants';

function ModalContent() {
  const navigate = useNavigate();
  return (
    <div>
      <Text size={14} css={{ margin: 0 }}>
        Save Transcript
      </Text>
      <Button auto onPress={() => navigate(MemoryRoutes.SAVE_TRANSCRIPT)} css={{ mt: '$2' }}>
        Select User
      </Button>
    </div>
  );
}

export default function App({ visible, closeHandler }: { visible: boolean; closeHandler: () => void }) {
  return (
    <Modal aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Body css={{ padding: '$10' }}>
        <MemoryRouter>
          <Routes>
            <Route index element={<ModalContent />} />
            <Route path={MemoryRoutes.SAVE_TRANSCRIPT} element={<SaveTranscript />} />
          </Routes>
        </MemoryRouter>
      </Modal.Body>
    </Modal>
  );
}
