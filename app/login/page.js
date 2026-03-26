"use client";
import {signIn} from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result=await signIn("credentials", {
            email,
            password,
            redirect: false, //para não redirecionar automaticamente
        });

        if(result.error){
            alert("Erro ao fazer login!");
        }else{
            router.push("/"); //se deu certo, vai para a página inicial
            router.refresh(); //atualiza a página para refletir o estado de autenticação
        }
    };

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <form onSubmit={handleSubmit} className="p-8 border rounded shadow-md w-80">
                <h1 className="text-2xl font.bold mb4">Login</h1>
                <input
                type="email"
                placeholder="Email"
                className="w-full p-2 mb-4 border rounded text-black"
                onChange={(e) => setEmail(e.target.value)}
                required
                />

    <input
     type="password"
     placeholder="Password"
        className="w-full p-2 mb-4 border rounded text-black"
        onChange={(e) => setPassword(e.target.value)}
        required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Entrar
        </button>
    </form>
</div>
    );
     

}