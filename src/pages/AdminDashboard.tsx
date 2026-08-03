import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-8 h-8 text-yellow-500" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        
        <p className="text-gray-400 mb-6">
          O painel administrativo requer um backend com banco de dados. 
          <br /><br />
          Para usar o painel completo com CRUD de links, você precisa:
        </p>

        <ul className="text-left text-gray-400 mb-8 space-y-2">
          <li>✓ Configurar um banco de dados MySQL</li>
          <li>✓ Implementar um servidor backend (Node.js/Express)</li>
          <li>✓ Usar um serviço como Render, Railway ou AWS para hospedar</li>
        </ul>

        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500">
            <strong>Versão Atual:</strong> Frontend Estático (Vercel)
            <br />
            <strong>Próximo Passo:</strong> Migrar para backend completo
          </p>
        </div>

        <Button 
          onClick={() => window.location.href = "/"}
          className="w-full bg-[#24A1DE] hover:bg-[#1a7aa8] text-white"
        >
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}
