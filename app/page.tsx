import HeroCarousel from "@/components/HeroCarousel";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      
      {/* 1. SEÇÃO HERO (CARROSSEL) */}
      <section className="w-full">
        <HeroCarousel />
      </section>

      {/* 2. PRÓXIMOS EVENTOS */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Próximos Eventos</h2>
            <p className="text-gray-500 mt-2 text-lg">Descobre o que está a acontecer em Albergaria-a-Velha.</p>
          </div>
          <Link 
            href="/eventos" 
            className="bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-bold hover:bg-blue-100 transition-all flex items-center gap-2"
          >
            Explorar todos os eventos
            <span>→</span>
          </Link>
        </div>

        {/* Grid de Eventos - Aqui depois ligarás à tua Base de Dados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="group bg-card rounded-[32px] overflow-hidden border border-gray-100 card-shadow hover:-translate-y-2 transition-all duration-500">
              <div className="relative h-64 w-full overflow-hidden">
                <img 
                  src={`https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?q=80&w=800&auto=format&fit=crop`} 
                  alt="Evento" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-sm">
                  <p className="text-blue-600 font-black text-center leading-none">2{i} <br/> <span className="text-[10px] uppercase">Mar</span></p>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex gap-2 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Cultura</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">Concerto da Primavera #{i}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-2">
                  Um evento imperdível com os melhores artistas locais no Cineteatro Alba.
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-lg font-black text-gray-900">15.00€</span>
                  <Link href={`/eventos/${i}`} className="text-sm font-bold text-blue-600 hover:text-blue-700">
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. SEÇÃO SOBRE NÓS (DESIGN IMPACTANTE) */}
      <section className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-[48px] overflow-hidden relative shadow-2xl shadow-blue-500/20">
          {/* Círculos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-12 p-8 md:p-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
                Vivalba: Onde a <br/> cidade ganha vida.
              </h2>
              <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-lg">
                O Vivalba nasceu da paixão por Albergaria-a-Velha. Somos a ponte entre os criadores de cultura e quem procura momentos inesquecíveis. De concertos a workshops, centralizamos tudo o que importa.
              </p>
              <div className="flex flex-wrap gap-8">
                <div>
                  <h4 className="text-4xl font-black text-white">+500</h4>
                  <p className="text-blue-200 text-sm font-medium">Bilhetes Vendidos</p>
                </div>
                <div className="w-[1px] h-12 bg-blue-400/30 hidden sm:block"></div>
                <div>
                  <h4 className="text-4xl font-black text-white">100%</h4>
                  <p className="text-blue-200 text-sm font-medium">Regional</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-[32px] overflow-hidden border-8 border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000" 
                  className="w-full h-full object-cover" 
                  alt="Sobre Nós"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}