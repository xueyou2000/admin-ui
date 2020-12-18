import { ConfigProvider, Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { getIntl, getLocale, localeInfo, RawIntlProvider } from 'umi';
import useMergeValue from 'use-merge-value';

export interface ModalPopupContextState {
  /** 销毁对话框 */
  destroy: (args?: any) => void;
}

export const ModalPopupContext = React.createContext<ModalPopupContextState>({ destroy: () => {} });
function ModalPopup(
  props: ModalProps & {
    children: React.ReactNode;
    onVisibleChange?: (visible: boolean) => void;
    onAfterClose: (args?: any) => void;
  },
) {
  const [intl] = React.useState(() => getIntl(getLocale(), true));
  const [visible, setVisible] = useMergeValue<boolean>(true, {
    value: props.visible,
    onChange: props.onVisibleChange,
  });
  const argsRef = useRef<any>(null);

  function hanldeClose() {
    setVisible(false);
  }

  function close(args?: any) {
    argsRef.current = args;
    setVisible(false);
  }

  function handleDestroy() {
    if (props.onAfterClose) {
      props.onAfterClose(argsRef.current);
    }
  }

  return (
    <Modal
      {...props}
      wrapClassName="modal-popup-wrapper"
      visible={visible}
      onCancel={hanldeClose}
      afterClose={handleDestroy}
    >
      <ConfigProvider locale={localeInfo[getLocale()]?.antd || {}}>
        <RawIntlProvider value={intl}>
          <ModalPopupContext.Provider value={{ destroy: close }}>{props.children}</ModalPopupContext.Provider>
        </RawIntlProvider>
      </ConfigProvider>
    </Modal>
  );
}

export default function modalPopup(
  content: React.ReactChild,
  options: ModalProps & { onAfterClose?: (args?: any) => void },
  onClose?: (args?: any) => void,
) {
  const div = document.createElement('div');
  document.body.appendChild(div);

  ReactDOM.render(
    <ModalPopup
      width={800}
      destroyOnClose={true}
      footer={null}
      {...options}
      onAfterClose={args => {
        ReactDOM.unmountComponentAtNode(div);
        div.parentNode?.removeChild(div);
        if (onClose) {
          onClose(args);
        }
      }}
    >
      {content}
    </ModalPopup>,
    div,
  );
}
