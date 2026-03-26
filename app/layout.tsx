import { Poppins } from "next/font/google"; // Opcional se já importaste no CSS
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Navbar from "@/components/Navbar";
import "./globals.css";

//configuração da fonte via Next.js

 const poppins=Poppins({
   subsets:["latin"],
   weight:["300", "400","500","600","700","800"],
   variable:"--font-poppins",

 });

  export const metadata = {
    title:"Vivalba-Site de eventos",
    description:"site para facilitar a usa procura de eventos por Albergaria",

  };

  export default async function RootLayout({
    children,
  }: {
    children:React.ReactNode;
  }) {
    const session = await getServerSession(authOptions);

     return(
       
       <html lang="pt"className={`${poppins.variable} scroll-smooth`}>
         <body className="font-sans antialiased bg-background text-foreground transition-colors duration-300">
          <Navbar user={session?.user}/>

          <div className="relative flex flex-col min-h-screen">
            <main className="flex-1 pt-20 pb-12">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
               </div>
            </main>

           <footer className="border-t border-border py-8 bg-card/50">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-sm text-gray-500 font-medium">
                &copy;{new Date().getFullYear()} Vivalba. Todos os direitos reservados.
              </p>
            </div>
           </footer> 
          </div>
         </body>
       </html>
     );
  }