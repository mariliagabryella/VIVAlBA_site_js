

import prisma from '@/lib/prisma';
import Link from 'next/link';
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  //vamos burcar eventos na base de dados
  const events = await prisma.event.findMany({
    orderBy: { date: 'asc' }, // Ordena pela data, do mais próximo ao mais distante
  });

  return (
    <main className="p-8">
   
    
      <h1 className="text-2xl font-bold mb-4">Próximos Eventos</h1>
      {events.length === 0 ? (
        <p>Não há eventos criados</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div key={event.id} className="border p-4 rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold ">{event.title}</h2>
              <p className="text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
              <p className="mt-2">{event.location}</p>
              {event.description ? (
                <p className="text-sm mt-2">{event.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}