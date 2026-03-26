import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Debug para termos a certeza absoluta do que o JS está a ver
    console.log("DEBUG - Email extraído:", data.email);
    console.log("DEBUG - Pass extraída:", data.password);

    const email = data.email;
    const password = data.password;

    // Validação ultra-específica
    if (!email || email === "" || !password || password === "") {
      return NextResponse.json(
        { error: "Dados em falta no servidor" }, 
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        password: hashedPassword,
        role: "USER",
      },
    });

    return NextResponse.json(
      { message: "Utilizador criado!", id: newUser.id },
      { status: 201 }
    );

  } catch (error) {
    console.error("ERRO CRÍTICO NA API:", error);
    return NextResponse.json(
      { error: "Erro ao salvar na base de dados" },
      { status: 500 }
    );
  }
}