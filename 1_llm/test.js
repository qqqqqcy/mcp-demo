import { llmCall } from "./index.js";

const messages = [
  {
    role: "user",
    content: "天空为什么是蓝色的？",
  },
];
const res = await llmCall({ messages });
console.log(JSON.stringify(res));
