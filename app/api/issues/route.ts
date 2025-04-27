import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET() {
  const issues = store.getAllIssues();
  return NextResponse.json(issues);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const issue = store.createIssue(data);
    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create issue' }, { status: 500 });
  }
}