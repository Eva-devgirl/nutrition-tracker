import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const user = await prisma.user.findFirst({
     where: { email: "demo@test.com" },
  })

  const food = await prisma.foodItem.findFirst({
     where: { name: "Tomato" },
  })

  if (!user || !food) { 
    return NextResponse.json({ error: "User or Food not found" }) 
  }

  const entry = await prisma.logEntry.create({
    data: {
       userId: user.id,
       foodItemId: food.id,
       date: new Date(),
       mealType: "BREAKFAST",
       grams: 200,
      },
    })
    
    return NextResponse.json(entry)
  }
