import { llmCall } from "../1_llm/index.js";

const messages = [
  {
    role: "user",
    content: "今天的天气",
  },
];

const res = await llmCall({
  messages: [
    {
      role: "system",
      content: `
你是一个智能函数助手。请根据用户输入完成两个任务：
1. 从可用函数列表中选择最合适的函数
2. 根据选择的函数的参数模式提取参数

可用函数列表：
${JSON.stringify([
  {
    name: "add",
    description: "计算两个数字的和",
    parameters: {
      type: "object",
      properties: {
        a: { type: "number" },
        b: { type: "number" },
      },
    },
  },
  {
    name: "search",
    description: "百度搜索",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string" },
      },
    },
  },
])}

请以JSON格式返回结果，格式为：
{
"functionName": "选择的函数名",
"parameters": {根据选择函数的schema提取的参数}
}
`,
    },
    ...messages,
  ],
});

console.log(JSON.stringify(res));
