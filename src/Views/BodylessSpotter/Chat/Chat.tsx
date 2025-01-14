import React, { Ref } from "react";
import { Input, Space, Button } from "antd";
import { SendOutlined, LoadingOutlined } from "@ant-design/icons";
import "./chat.css";
import { Empty, Spin, Flex } from "antd";
import { Typography } from "antd";
import { Select } from "antd";
import { useStore, StoreState, Message } from "../Store";
import { MessageView } from "./MessageView";
import { Worksheets } from "../Services/TS";
import { SettingsContext } from "../../../App";
export interface ChatProps {
  threadRef: any,
  className: string
}

export const Chat: React.FC<ChatProps> = ({ threadRef, className }) => {
  const [mesgTxt, setMesgTxt] = React.useState("");
  const [loading, setLoading] = React.useState<string | boolean>("setting up the intelligence");
  const [showWait, setShowWait] = React.useState(false);
  const setCurrentWS = useStore((state: any) => state.setCurrentWS);
  const currentWS = useStore((state: any) => state.currentWS);
  const showWaitResolver = React.useRef<any>(null);
  const messages = useStore((state: any) => state.messages);
  const addMessage = useStore((state: any) => state.addMessage);
  const chatRef = React.useRef<HTMLDivElement>(null);

  const onSendMessage = async () => {
    addMessage({ sender: "user", text: mesgTxt });
    setMesgTxt("");
    setLoading("thinking about this");
    if (threadRef && threadRef.current){
      await threadRef.current.getSystemResponse(mesgTxt, (systemMessage: any) => {
        addMessage({ sender: "system", ...systemMessage });
        setLoading("still working");
      });
    }

    setLoading(false);
  };

  React.useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  React.useEffect(() => {
    setLoading("Setting up the intelligence");
    threadRef.current?.isReady.then(() => {
      setLoading(false);
      console.log(threadRef.current);
      // threadRef.current.setWaitCb(() => {
      //   //@ts-ignore
      //   let { promise, resolve, reject } = Promise.withResolvers();
      //   setShowWait(true);
      //   showWaitResolver.current = resolve;
      //   return promise;
      // });
    });
  }, [threadRef.current]);

  return (
    <SettingsContext.Consumer>
    {({settings}) => (
    <div className="flex flex-col h-full">

      <div ref={chatRef} className="chat">
        {messages.length ? (
          messages.map((mesg: Message) => {
            return <MessageView message={mesg} />;
          })
        ) : (
          <div className="h-full flex align-center items-center justify-center flex-col">
            <img src={settings.logo} alt="logo"  className="h-40 mb-2"/>
            <div className="text-2xl font-bold">
            {settings.otherSettings.bodyLessSpotterName}
            </div>
          </div>
        )}
        {loading && (
          <Flex gap="small" align="center">
            <Spin indicator={<LoadingOutlined spin />} size="small" />
            {typeof loading === "string" && (
              <Typography.Text type="secondary">{loading}</Typography.Text>
            )}
          </Flex>
        )}
      </div>
      <div style={{ margin: "0 auto" }}>
        {showWait && (
          <Button
            onClick={() => {
              setShowWait(false);
              showWaitResolver.current?.();
            }}
          >
            Continue
          </Button>
        )}
      </div>
      <Space.Compact className="input">
        <Input
          disabled={!!loading}
          placeholder="Ask me anything!"
          allowClear
          value={mesgTxt}
          onChange={(e) => setMesgTxt(e.target.value)}
          onPressEnter={onSendMessage}
        />
        <Button
          disabled={!!loading}
          onClick={onSendMessage}
          icon={<SendOutlined />}
        />
      </Space.Compact>
    </div>
    )}
    </SettingsContext.Consumer>
  );
};
