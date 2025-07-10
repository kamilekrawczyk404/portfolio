import { NextResponse } from "next/server";
import * as path from "node:path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    const directoryPath = path.join(process.cwd(), "public/projects");
    const files = await fs.readdir(directoryPath);
    const directories = [];

    for (const item of files) {
      const itemPath = path.join(directoryPath, item);
      const stats = await fs.stat(itemPath);
      if (stats.isDirectory()) {
        const photos = [];

        for (const photo of await fs.readdir(path.join(directoryPath, item))) {
          photos.push(photo);
        }

        directories.push([item, photos]);
      }
    }

    return NextResponse.json(Object.fromEntries(directories), { status: 200 });
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return NextResponse.json(
      { error: "Failed to read directory" },
      { status: 500 },
    );
  }
}
