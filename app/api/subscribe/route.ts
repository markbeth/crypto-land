import { NextResponse } from 'next/server';
import { prisma } from '../../../prisma/lib/prisma';  // Убедитесь, что путь до prisma клиента правильный

// Тип для тела запроса
interface SubscribeRequest {
  email: string;
}

export async function POST(request: Request) {
  try {
    // Получаем email из тела запроса
    const { email } = await request.json() as SubscribeRequest;

    // Валидация email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Сохраняем email в базу данных через Prisma
    const subscriber = await prisma.subscriber.create({
      data: {
        email,
      },
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed',
        subscriber
      },
      { status: 200 }
    );

  } catch (error) {
    // Обработка ошибки дубликата email
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 400 }
      );
    }

    console.error('Subscription error:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}