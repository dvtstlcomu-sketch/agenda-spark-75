import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Camera, Activity, CheckCircle2, X } from "lucide-react";
import { submitListing } from "@/lib/listings";

const field =
  "w-full h-14 px-5 rounded-2xl bg-white/40 border border-black/5 text-slate-900 focus:ring-2 focus:ring-[var(--color-accent)] outline-none placeholder:text-slate-400 font-medium text-sm";

export function SubmitListingForm() {
  const qc = useQueryClient();
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const s = (k: string) => String(f.get(k) ?? "").trim();
    if (files.length < 3) {
      setMsg({ ok: false, text: "Envie no mínimo 3 fotos do imóvel (fachada, sala e cozinha, por exemplo)." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await submitListing({
        ownerName: s("ownerName"),
        ownerPhone: s("ownerPhone"),
        title: s("title"),
        type: s("type"),
        location: s("location"),
        area: s("area"),
        beds: Number(s("beds") || 0),
        baths: Number(s("baths") || 0),
        price: s("price"),
        documentation: s("documentation"),
        description: s("description"),
        files,
      });
      form.reset();
      setFiles([]);
      await qc.invalidateQueries({ queryKey: ["listings"] });
      setMsg({ ok: true, text: "Anúncio enviado! Ele aparecerá no site assim que for aprovado pela nossa equipe." });
    } catch (err) {
      console.error(err);
      setMsg({ ok: false, text: "Não foi possível enviar. Verifique os dados e tente novamente." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input name="ownerName" required maxLength={80} className={field} placeholder="Nome Completo" />
        <input name="ownerPhone" required type="tel" maxLength={20} className={field} placeholder="WhatsApp / Contato" />
      </div>
      <input name="title" required maxLength={120} className={field} placeholder="Título do anúncio (ex: Casa 3 quartos no Centro)" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <select name="type" className={`${field} font-bold text-xs`}>
          <option>Casa</option>
          <option>Apartamento</option>
          <option>Terreno</option>
          <option>Comercial</option>
          <option>Chácara / Sítio</option>
          <option>Gleba</option>
        </select>
        <input name="location" required maxLength={100} className={field} placeholder="Bairro / Cidade" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <input name="area" inputMode="numeric" maxLength={10} className={field} placeholder="m²" />
        <input name="beds" type="number" min={0} max={50} className={field} placeholder="Quartos" />
        <input name="baths" type="number" min={0} max={50} className={field} placeholder="Banheiros" />
        <input name="price" maxLength={30} className={field} placeholder="Valor (R$)" />
      </div>
      <select name="documentation" className={`${field} font-bold text-xs`}>
        <option>Documentação Regularizada</option>
        <option>Em Processo de Regularização</option>
        <option>Contrato de Compra e Venda</option>
      </select>
      <textarea name="description" maxLength={600} rows={3} className={`${field} h-auto py-4`} placeholder="Descrição (opcional — geramos automaticamente se ficar em branco)" />

      <div className="relative group">
        <div className="w-full min-h-[160px] py-6 rounded-2xl bg-white/40 border-2 border-dashed border-black/10 flex flex-col items-center justify-center gap-2 group-hover:border-[var(--color-accent)]/50 transition-colors relative overflow-hidden">
          <input
            type="file"
            multiple
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={(e) => setFiles(Array.from(e.target.files ?? []).filter((f) => f.type.startsWith("image/")).slice(0, 10))}
          />
          <Camera className="w-8 h-8 text-slate-400 group-hover:text-[var(--color-accent)]" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center px-4">
            {files.length ? `${files.length} foto(s) selecionada(s)${files.length < 3 ? " — mínimo 3" : ""}` : "Tire fotos ou suba arquivos (mínimo 3, até 10)"}
          </span>
          <div className="mt-3 px-6 text-left w-full space-y-2">
            <p className="text-[10px] font-black uppercase text-[var(--color-accent)]">Guia de Fotos:</p>
            <ul className="text-[10px] text-slate-500 font-bold space-y-1 list-disc pl-4 uppercase">
              <li><span className="text-slate-900">Fachada:</span> foto frontal com luz natural.</li>
              <li><span className="text-slate-900">Sala:</span> fotografe dos cantos, celular deitado.</li>
              <li><span className="text-slate-900">Cozinha:</span> destaque bancadas e armários.</li>
              <li><span className="text-slate-900">Quartos:</span> mostre espaço e janelas.</li>
              <li><span className="text-slate-900">Banheiros:</span> revestimentos e box.</li>
            </ul>
          </div>
        </div>
        {files.length > 0 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {files.map((f, i) => (
              <div key={i} className="relative shrink-0">
                <img src={URL.createObjectURL(f)} alt="" className="w-16 h-16 object-cover rounded-lg" />
                <button type="button" aria-label="Remover foto" onClick={() => setFiles(files.filter((_, j) => j !== i))} className="absolute -top-1 -right-1 bg-slate-900 text-white rounded-full p-0.5">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {msg && (
        <p className={`text-sm font-bold flex items-center gap-2 ${msg.ok ? "text-green-700" : "text-red-700"}`}>
          {msg.ok && <CheckCircle2 size={16} />} {msg.text}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="w-full bg-slate-900 text-white hover:bg-[var(--color-accent)] hover:text-slate-900 min-h-14 py-3 px-4 rounded-xl font-black text-xs sm:text-sm shadow-xl uppercase tracking-wider transition-all disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {busy ? (<><Activity className="w-4 h-4 animate-spin" /> Publicando...</>) : "Enviar Imóvel para Venda e Locação"}
      </button>
    </form>
  );
}
