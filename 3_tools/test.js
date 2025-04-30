import { z } from "zod";
import { llmCall } from "../1_llm/index.js";

// 工具定义集合
const TOOLS = {
  // 加法
  add: {
    name: "add",
    description: "计算两个数字的和",
    parameters: z.object({
      a: z.number().describe("第一个数字"),
      b: z.number().describe("第二个数字"),
    }),
    execute: ({ a, b }) => {
      const result = a + b;
      return result;
    },
  },

  // 搜索
  search: {
    name: "search",
    description: "百度搜索",
    parameters: z.object({
      query: z.string().describe("搜索关键词"),
    }),
    execute: async ({ query }) => {
      const response = await fetch(
        `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`,
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
        }
      );
      const html = await response.text();
      const regex = /<h3 class="t">.*?<a.*?>(.*?)<\/a>.*?<a.*?href="(.*?)".*?>/;
      const match = regex.exec(html);
      if (!match) {
        return "没有找到相关结果";
      }
      const title = match[1].replace(/<[^>]+>/g, "").trim();
      const url = match[2];
      return `\n${title}\n${url}`;
    },
  },
};

const messages = [
  {
    role: "user",
    content: "北京今天的天气",
  },
];

const res = await llmCall({
  messages,

  // 工具注册
  tools: Object.values(TOOLS).map((tool) => ({
    type: "function",
    function: {
      name: tool.name,
      description: tool.description,
      parameters: tool.parameters.shape,
    },
  })),
});

// 执行工具
async function executeTool(response) {
  const message = response.choices[0].message;

  // 可能不适配任何工具
  if (!message.tool_calls) {
    return message.content;
  }

  const toolCall = message.tool_calls[0].function;
  console.log("fn 调用:", toolCall);
  return await TOOLS[toolCall.name].execute(JSON.parse(toolCall.arguments));
}
const result = await executeTool(res);

console.log(`结果: ${result}`);
