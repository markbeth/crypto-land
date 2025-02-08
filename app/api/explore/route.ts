import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // Parse request to validate JSON but don't use the result
    await request.json()
    
    // Массив предопределенных новостей с их настроениями
    const predefinedNews = [
      {
        news_text: "New crypto ETF launched by Grayscale",
        output: "positive"
      },
      {
        news_text: "Markets under pressure again with new home sales expectations data",
        output: "negative"
      },
      {
        news_text: "Meme coins daily update",
        output: "neutral"
      }
    ]
    
    // Выбираем случайную новость
    const randomNews = predefinedNews[Math.floor(Math.random() * predefinedNews.length)]
    
    const result = {
      news_text: randomNews.news_text,
      sentiment: randomNews.output,
      executionTime: "0.5s"
    }

    return NextResponse.json({ 
      success: true, 
      data: result 
    })

  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to process algorithm" },
      { status: 500 }
    )
  }
}
