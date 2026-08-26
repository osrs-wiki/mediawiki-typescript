import { Readable } from "stream";
import * as os from "os";
import * as path from "path";
import * as fs from "fs/promises";
import { resolveInput } from "../input/resolveInput";

describe("resolveInput", () => {
  test("resolves a plain string", async () => {
    expect(await resolveInput("hello")).toBe("hello");
  });

  test("resolves a file path", async () => {
    const filePath = path.join(os.tmpdir(), `resolveInput-${Date.now()}.txt`);
    await fs.writeFile(filePath, "from a file", "utf-8");
    try {
      expect(await resolveInput({ filePath })).toBe("from a file");
    } finally {
      await fs.unlink(filePath);
    }
  });

  test("resolves a readable stream", async () => {
    const stream = Readable.from(["from ", "a ", "stream"]);
    expect(await resolveInput(stream)).toBe("from a stream");
  });

  test("resolves a URL via fetch", async () => {
    const fetchSpy = jest
      .spyOn(global, "fetch")
      .mockResolvedValue({ text: () => Promise.resolve("from a url") } as Response);
    try {
      expect(await resolveInput(new URL("https://example.com/wiki/Example?action=raw"))).toBe(
        "from a url"
      );
      expect(fetchSpy).toHaveBeenCalledWith(new URL("https://example.com/wiki/Example?action=raw"));
    } finally {
      fetchSpy.mockRestore();
    }
  });
});
