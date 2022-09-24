import React from 'react';
import { Modal, Button, Text, Row, Checkbox } from '@nextui-org/react';
import AllowScreenshot from './AllowScreenshot';
import PreventTypingNotification from './PreventTyping';

export default function App({ visible, closeHandler }: { visible: boolean; closeHandler: () => void }) {
  return (
    <Modal closeButton aria-labelledby="modal-title" open={visible} onClose={closeHandler}>
      <Modal.Header>
        <Text id="modal-title" size={18}>
          Better Snapchat
        </Text>
      </Modal.Header>
      <Modal.Body>
        <AllowScreenshot />
        <PreventTypingNotification />
      </Modal.Body>
      <Modal.Footer>
        <Button auto onPress={closeHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
