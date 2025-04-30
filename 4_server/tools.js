import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

const server = new McpServer({
  name: "math",
  version: "1.0.0",
});

server.tool(
  "add",
  "计算两个数字的和",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: `${a} + ${b} = ${a + b}`,
        },
      ],
    };
  }
);

server.tool(
  "minus",
  "计算两个数字的差",
  {
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  },
  async ({ a, b }) => {
    return {
      content: [
        {
          type: "text",
          text: `${a} - ${b} = ${a - b}`,
        },
      ],
    };
  }
);

export default server;
