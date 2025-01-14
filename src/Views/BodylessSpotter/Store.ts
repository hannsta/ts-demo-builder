import { create } from "zustand";
import { Worksheets } from "./Services/TS";

export interface Message {
    text: string,
    sender: string,
    dom: HTMLDivElement,
    stream: any
}
export interface Worksheet {
    key: string,
    name: string,
    id: string
}
export interface StoreState {
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;
    currentWS: Worksheet;
    setCurrentWS: (ws: Worksheet) => void;
  }
const sampleMessage: Message = {
  text: "bla",
  sender: "user|system",
  dom: document.createElement("div"),
  stream: null
};


export const useStore = create((set) => ({
  messages: [],
  addMessage: (message: Message) =>
    set((state: any) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set((state: any) => ({ messages: [] })),
  currentWS: Worksheets.SAMPLE_APPAREL,
  setCurrentWS: (ws: any) => {
    set((state: any) => (state.currentWS = ws));
  },
}));
