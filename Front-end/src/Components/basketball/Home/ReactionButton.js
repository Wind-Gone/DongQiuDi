import React from "react";
import { message,Popover, Button, Modal , Input} from "antd";

const { TextArea } = Input;
const content = (
  <div>
    <p>单击以向我们反馈，欢迎您的任何意见！</p>
  </div>
);

const ReactionButton = () => {
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("THANKS FOR YOUR REACTION");


  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("正在发送 ...");
    setConfirmLoading(true);
    setTimeout(() => {
      message.success('我们已收到你的反馈，再次感谢！');
      setModalText("THANKS FOR YOUR REACTION");
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  return (
    <>
      <Popover content={content} title="向我们反馈" placement="bottomRight">
        <Button type="primary" onClick={showModal}>向我们反馈</Button>
      </Popover>
      <Modal
        title="反馈"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="发送"
        cancelText="取消"
      >
        <p>{modalText}</p>
        <TextArea
          placeholder="please input here ..."
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      </Modal>
    </>
  );
};

export default ReactionButton;
