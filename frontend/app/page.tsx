import { Poppins } from "next/font/google";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
      //bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-slate-400 - Gradiente
      <main className="flex h-full flex-col items-center justify-center bg-black">
        <div className="space-y-6 text-center">
          <h1 className={cn(
            "text-6xl font-semibold text-gray-500 drop-shadow-md",
            font.className, 
          )}>
            Tabela de Materiais
          </h1>
            <div>
              <LoginButton>
                <Button variant="secondary" size="lg">
                  Entrar
                </Button>
              </LoginButton>
            </div>
        </div>
      </main>
  );
}