import {redirect} from 'next/navigation';
import { getServerSession } from 'next-auth';// Função mágica que vê se alguém fez login
import prisma from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function NovoEventoPage() {
    const session = await getServerSession(authOptions);
    
    // ISTO É FUNDAMENTAL: Vê o que aparece no teu terminal preto
    console.log("DEBUG SESSÃO:", JSON.stringify(session?.user, null, 2));

    if (!session || (session.user as any).role !== "ADMIN") {
        console.log("Acesso Negado: Role atual é", (session?.user as any)?.role);
        redirect("/");
    }
    // ...


    //Esta é a sever action: corre o servidor quando o formulario é enviado
    async function criarEvento(formData:FormData){
        'use server';
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const date = formData.get('date') as string;
        const location = formData.get('location') as string;
        
        //guardar na base de dados usando o prisma
        await prisma.event.create({
            data:{
                title,
                description,
                date: new Date(date),
                location,
            }
        });

        //Depois de guardar, volta para a pagina principal
        redirect('/');

    }
    return (
        <main className="max-w-md mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Criar Novo Evento</h1>

            <form action={criarEvento} className="flex flex-col gap-4">
                <div>
                    <label className="block mb-1 font-medium">Nome do Evento</label>
                    <input
                        name="title"
                        type="text"
                        required
                        className="w-full border p-2 rounded text-black"
                        placeholder="ex: Festa de Aniversário"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Data e Hora</label>
                    <input
                        name="date"
                        type="datetime-local"
                        required
                        className="w-full border p-2 rounded text-black"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-medium">Localização</label>
                    <input
                        name="location"
                        type="text"
                        required
                        className="w-full border p-2 rounded text-black"
                        placeholder="ex: Lisboa ou Online"
                        />
                </div>
                <div>
                     <label className="block mb-1 font-medium">Descrição (opcional)</label>
                     <textarea
                        name="description"
                        className="w-full border p-2 rounded text-black"
                        placeholder="ex: Traga comida e bebida para compartilhar!"
                        rows={3}
                        />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                    >
                    Criar Evento
                    </button>
            </form>

        </main>

    );
}
