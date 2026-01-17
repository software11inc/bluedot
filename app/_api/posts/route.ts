import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "posts.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataPath, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const newPost = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const posts = JSON.parse(data);

    newPost.id = Date.now().toString();
    newPost.createdAt = new Date().toISOString();
    posts.push(newPost);

    await fs.writeFile(dataPath, JSON.stringify(posts, null, 2));
    return NextResponse.json(newPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedPost = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const posts = JSON.parse(data);

    const index = posts.findIndex((p: { id: string }) => p.id === updatedPost.id);
    if (index === -1) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    posts[index] = updatedPost;
    await fs.writeFile(dataPath, JSON.stringify(posts, null, 2));
    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const posts = JSON.parse(data);

    const filtered = posts.filter((p: { id: string }) => p.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
