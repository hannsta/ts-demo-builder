import OpenAI, { AzureOpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { Message } from "../Store";
export const openai = process.env.REACT_APP_GPT_API_KEY ? new AzureOpenAI({
    apiKey: process.env.REACT_APP_GPT_API_KEY,
    endpoint: "https://nls-benchmark-test.openai.azure.com/",
    deployment: "eureka-gpt-4o",
    apiVersion: "2024-08-01-preview",
    dangerouslyAllowBrowser: true,
    httpAgent: () => {},
    fetch: fetch,
  }) : null;

const MODEL = "gpt-4o-mini";

export const getGPTResponse = async (
  messages: ChatCompletionMessageParam[],
  stream = false,
  model = MODEL
) => {
  if (!openai) return
  if (stream) {
    return openai.beta.chat.completions.stream({
      model,
      messages,
    });
  }

  const resp = await openai.chat.completions.create({
    model,
    messages,
  });
  return {
    ...resp,
    finalChatCompletion: () => resp,
  };
};
