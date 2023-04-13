import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@nextui-org/react';
import React from 'react';
import ThemeProvider from '../../../common/components/ThemeProvider';
import styles from './Container.module.css';
import SettingsModal from './Modal';

export default function ModalButton() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(false);

  return (
    <ThemeProvider>
      <div className={styles.container}>
        <Button flat auto onPress={() => setVisible(true)} icon={<FontAwesomeIcon icon={faWandMagicSparkles} />} />
        <SettingsModal closeHandler={handler} visible={visible} />
      </div>
    </ThemeProvider>
  );
}
