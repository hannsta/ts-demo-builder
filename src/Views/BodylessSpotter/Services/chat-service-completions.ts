import { BodylessConversation, getSampleData } from "./TS";
import { getDefaultInsuranceAssistantPrompt } from "./Prompt";
import { openai, getGPTResponse } from "./LLM";
import { Message, Worksheet } from "../Store";

export class Thread {
  public isReady: Promise<void>;
  public conversation: any;
  public messages: any[] = [];
  constructor(worksheetId: string, TSURL: string) {
    console.log("initting")

    this.isReady = this.init(worksheetId, TSURL);
    console.log("inited")
  }

  async init(worksheetId: string, TSURL: string) {
    console.log("getting BodylessConversation")

    this.conversation = new BodylessConversation({
      worksheetId: worksheetId
    });
    console.log("getting initial prompt")
    const initialPrompt = await getDefaultInsuranceAssistantPrompt(
      worksheetId,
      TSURL
    );
    this.messages = [
      {
        role: "user",
        content: initialPrompt,
      },
    ];
    console.log("initialPrompt",initialPrompt)
  }

  async getSystemResponse(userMessage: string, addMessageCb: any) {
    this.addMessage(userMessage, "user");
    const response = await this.getGPTResponse();
    const lastMessage = response.content;
    if (lastMessage.startsWith("get_data")) {
      addMessageCb({
        text: lastMessage.replace("get_data: ", "").replaceAll('"', ""),
      });
      const viz = await this.conversation.sendMessage(
        this.messages.at(-2)?.content
      );
      addMessageCb({
        dom: viz.container,
      });
    } else {
      addMessageCb({
        text: this.getLastMessage()?.content,
      });
    }
  }

  addMessage(messageText: string, role: any) {
    this.messages.push({
      role,
      content: messageText,
    });
  }

  getLastMessage() {
    return this.messages.at(-1);
  }

  async getGPTResponse() {
    const gptResp: any = await getGPTResponse(this.messages);
    const message = {
      role: "system",
      content: gptResp.choices[0].message.content,
    };
    this.messages.push(message);
    return message;
  }
}
