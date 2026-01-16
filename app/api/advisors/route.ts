import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "advisors.json");

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
    const newAdvisor = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const advisors = JSON.parse(data);

    newAdvisor.id = Date.now().toString();
    advisors.push(newAdvisor);

    await fs.writeFile(dataPath, JSON.stringify(advisors, null, 2));
    return NextResponse.json(newAdvisor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create advisor" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedAdvisor = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const advisors = JSON.parse(data);

    const index = advisors.findIndex((a: { id: string }) => a.id === updatedAdvisor.id);
    if (index === -1) {
      return NextResponse.json({ error: "Advisor not found" }, { status: 404 });
    }

    advisors[index] = updatedAdvisor;
    await fs.writeFile(dataPath, JSON.stringify(advisors, null, 2));
    return NextResponse.json(updatedAdvisor);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update advisor" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await fs.readFile(dataPath, "utf-8");
    const advisors = JSON.parse(data);

    const filtered = advisors.filter((a: { id: string }) => a.id !== id);
    await fs.writeFile(dataPath, JSON.stringify(filtered, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete advisor" }, { status: 500 });
  }
}
