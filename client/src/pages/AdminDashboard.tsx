import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useLocation } from "wouter";
import { useState, useMemo } from "react";
import { Loader2, Plus, Edit2, Trash2, Copy, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormData {
  slug: string;
  title: string;
  description: string;
  telegramUrl: string;
}

const initialFormData: FormData = {
  slug: "",
  title: "",
  description: "",
  telegramUrl: "",
};

export default function AdminDashboard() {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showPasswords, setShowPasswords] = useState<Record<number, boolean>>({});

  const utils = trpc.useUtils();
  const { data: links = [], isLoading } = trpc.bridgeLinks.getAll.useQuery();
  const createMutation = trpc.bridgeLinks.create.useMutation();
  const updateMutation = trpc.bridgeLinks.update.useMutation();
  const deleteMutation = trpc.bridgeLinks.delete.useMutation();
  const toggleMutation = trpc.bridgeLinks.toggleStatus.useMutation();

  // Redirect if not admin
  if (!authLoading && (!isAuthenticated || user?.role !== "admin")) {
    navigate("/");
    return null;
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  const handleOpenDialog = (link?: any) => {
    if (link) {
      setEditingId(link.id);
      setFormData({
        slug: link.slug,
        title: link.title,
        description: link.description || "",
        telegramUrl: link.telegramUrl,
      });
    } else {
      setEditingId(null);
      setFormData(initialFormData);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingId(null);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.slug || !formData.title || !formData.telegramUrl) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          id: editingId,
          ...formData,
        });
        toast.success("Link atualizado com sucesso!");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Link criado com sucesso!");
      }

      await utils.bridgeLinks.getAll.invalidate();
      handleCloseDialog();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao salvar link");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja deletar este link?")) return;

    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Link deletado com sucesso!");
      await utils.bridgeLinks.getAll.invalidate();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao deletar link");
    }
  };

  const handleToggleStatus = async (id: number, currentStatus: boolean) => {
    try {
      await toggleMutation.mutateAsync({
        id,
        isActive: !currentStatus,
      });
      toast.success(
        `Link ${!currentStatus ? "ativado" : "desativado"} com sucesso!`
      );
      await utils.bridgeLinks.getAll.invalidate();
    } catch (error: any) {
      toast.error(error?.message || "Erro ao atualizar status");
    }
  };

  const handleCopyLink = (slug: string) => {
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copiado para a área de transferência!");
  };

  const activeCount = useMemo(
    () => links.filter((l) => l.isActive).length,
    [links]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <div className="border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Painel Administrativo
              </h1>
              <p className="text-foreground/60 mt-1">
                Gerencie seus links de ponte para Telegram
              </p>
            </div>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-accent hover:bg-accent/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Link
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Total de Links
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {links.length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Links Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{activeCount}</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-foreground/60">
                Links Inativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground/40">
                {links.length - activeCount}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Links Table */}
        <Card className="bg-card border-border/50">
          <CardHeader>
            <CardTitle>Seus Links</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : links.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-foreground/60 mb-4">
                  Nenhum link criado ainda
                </p>
                <Button
                  onClick={() => handleOpenDialog()}
                  variant="outline"
                >
                  Criar Primeiro Link
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/50">
                      <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-sm">
                        Slug
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-sm">
                        Título
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-sm">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-foreground/60 text-sm">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((link) => (
                      <tr
                        key={link.id}
                        className="border-b border-border/30 hover:bg-background/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <code className="bg-background/50 px-2 py-1 rounded text-sm text-accent font-mono">
                              /{link.slug}
                            </code>
                            <button
                              onClick={() => handleCopyLink(link.slug)}
                              className="p-1 hover:bg-background rounded transition-colors"
                              title="Copiar link"
                            >
                              <Copy className="w-4 h-4 text-foreground/40" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="font-medium text-foreground">
                              {link.title}
                            </p>
                            {link.description && (
                              <p className="text-sm text-foreground/60 truncate">
                                {link.description}
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={link.isActive === 1}
                              onCheckedChange={() =>
                                handleToggleStatus(link.id, link.isActive === 1)
                              }
                            />
                            <span
                              className={`text-sm font-medium ${
                                link.isActive === 1
                                  ? "text-accent"
                                  : "text-foreground/40"
                              }`}
                            >
                              {link.isActive === 1 ? "Ativo" : "Inativo"}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleCopyLink(link.slug)
                              }
                              className="p-2 hover:bg-background rounded transition-colors"
                              title="Copiar link público"
                            >
                              <Copy className="w-4 h-4 text-foreground/60" />
                            </button>
                            <button
                              onClick={() => handleOpenDialog(link)}
                              className="p-2 hover:bg-background rounded transition-colors"
                              title="Editar"
                            >
                              <Edit2 className="w-4 h-4 text-foreground/60" />
                            </button>
                            <button
                              onClick={() => handleDelete(link.id)}
                              className="p-2 hover:bg-background rounded transition-colors"
                              title="Deletar"
                            >
                              <Trash2 className="w-4 h-4 text-destructive/60" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialog for Create/Edit */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-card border-border/50">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingId ? "Editar Link" : "Criar Novo Link"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Slug (URL) *
              </label>
              <Input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                placeholder="exemplo-vip"
                disabled={!!editingId}
                className="bg-background border-border/50"
              />
              <p className="text-xs text-foreground/50 mt-1">
                Será acessível em: /{formData.slug}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Título *
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Grupo VIP Exclusivo"
                className="bg-background border-border/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição
              </label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descrição do grupo ou comunidade..."
                rows={3}
                className="bg-background border-border/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL do Telegram *
              </label>
              <Input
                value={formData.telegramUrl}
                onChange={(e) =>
                  setFormData({ ...formData, telegramUrl: e.target.value })
                }
                placeholder="https://t.me/seu_grupo"
                type="url"
                className="bg-background border-border/50"
              />
              <p className="text-xs text-foreground/50 mt-1">
                Deve ser uma URL válida (https://t.me/...)
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent hover:bg-accent/90 text-white"
                disabled={
                  createMutation.isPending || updateMutation.isPending
                }
              >
                {createMutation.isPending || updateMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : editingId ? (
                  "Atualizar"
                ) : (
                  "Criar"
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
