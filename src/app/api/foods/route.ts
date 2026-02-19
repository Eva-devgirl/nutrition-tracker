
let foods = [
  { id: 1, name: "Banana", kcal: 89, protein: 1, carbs: 23, fat: 0.3 },
  { id: 2, name: "Apple", kcal: 52, protein: 0.3, carbs: 14, fat: 0.2 },
];

export async function GET() {
  return Response.json(foods);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newFood = {
    id: foods.length + 1,
    name: body.name,
    kcal: Number(body.kcal),
    protein: Number(body.protein),
    carbs: Number(body.carbs),
    fat: Number(body.fat),
  };

  foods.push(newFood);

  return Response.json(newFood);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));

  foods = foods.filter((f) => f.id !== id);

  return Response.json({ ok: true });
}

  
