import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { url } = await request.json();

    if (!url) {
        return NextResponse.json({ error: 'Missing blob URL' }, { status: 400 });
    }

    try {
        await del(url);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete blob' }, { status: 500 });
    }
}

