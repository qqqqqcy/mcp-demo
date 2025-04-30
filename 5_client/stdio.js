import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const mcp = new Client({ name: "mcp-client", version: "1.0.0" });

const transport = new StdioClientTransport({
  command: 'node',
  args: ["/Users/bytedance/my-project/trae/mcp_demo/4_server/stdio.js"],
});

await mcp.connect(transport);

// 展示 Server 提供的 tools
const listTools = await mcp.listTools();
console.log(listTools);

// 执行指定的 tool
const result = await mcp.callTool({
  name: "add",
  arguments: { a: 1, b: 2 },
});
console.log(result);

mcp.close();
