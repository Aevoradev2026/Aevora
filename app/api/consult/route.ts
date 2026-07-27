import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, type, budget, description } = await req.json()

    if (!name || !description) {
      return NextResponse.json(
        { error: 'Name and description are required' },
        { status: 400 }
      )
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in .env')
    } else {
      const telegramMessage =
        `📩 New Project Request\n\n` +
        `👤 Name: ${name}\n` +
        `✉️ Email: ${email || 'Not provided'}\n` +
        `📁 Project Type: ${type || 'Not specified'}\n` +
        `💰 Budget: ${budget || 'Not specified'}\n` +
        `📝 Description: ${description}`

      const telegramRes = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: telegramMessage,
          }),
        }
      )

      const telegramData = await telegramRes.json()

      if (!telegramRes.ok || !telegramData.ok) {
        console.error('Telegram send failed:', telegramData)
      } else {
        console.log('Telegram message sent successfully')
      }
    }

    return NextResponse.json({
      response:
        "Thank you for reaching out. We've received your project brief and will be in touch within 24 hours.\n\n— The Aevora Team",
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {
        response:
          "Thank you for reaching out. We've received your project brief and will be in touch within 24 hours.\n\n— The Aevora Team",
      },
      { status: 200 }
    )
  }
}
