import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy:{date:'asc'}//ordena pela data ,do mais próximo ao mais distante
  });
    return NextResponse.json(events);
  } catch (error) {
     return NextResponse.json({error:"Erro ao carrregar os eventos "}, {status:500});
  }
}

//criar novo evento
export async function POST(request) {
  try{
    const body =await request.json();
    const newEvent = await prisma.event.create({
      data:{
        title:body.title,
        description:body.description,
        date:new Date(body.date), //coverte a string de data para formato Datetime
        location:body.location,
   }
});
    return NextResponse.json(newEvent, {status:201});
}catch(error){
  return NextResponse.json({error:"Erro ao criar o evento"}, {status:500});
}
}
