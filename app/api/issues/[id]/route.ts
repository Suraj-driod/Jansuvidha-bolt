import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const issue = store.getIssueById(params.id);
  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
  return NextResponse.json(issue);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const issue = store.updateIssue(params.id, data);
    if (!issue) {
      return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }
    return NextResponse.json(issue);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update issue' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const success = store.deleteIssue(params.id);
  if (!success) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Issue deleted successfully' });
}