import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, type, message } = body;

    if (!name || !contact || !message) {
      return NextResponse.json(
        { error: "Заполните все обязательные поля" },
        { status: 400 }
      );
    }

    // Demo: log submission. In production — send to Telegram Bot API, email, CRM.
    console.log("[Contact Form]", { name, contact, type, message, at: new Date().toISOString() });

    return NextResponse.json({
      success: true,
      message:
        "Заявка принята! Специалист свяжется с вами в Telegram или WhatsApp в ближайшее время.",
    });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
