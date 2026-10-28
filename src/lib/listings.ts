import { supabase } from "@/integrations/supabase/client";

export const BUCKET = "property-photos";
export const MAX_LISTINGS = 6;

export type Listing = {
  id: string;
  title: string;
  type: string;
  status: string;
  price: string;
  location: string;
  image: string;
  beds: number;
  baths: number;
  area: string;
  description: string;
};

async function signPaths(paths: string[]): Promise<Record<string, string>> {
  if (paths.length === 0) return {};
  const { data } = await supabase.storage.from(BUCKET).createSignedUrls(paths, 60 * 60 * 24 * 7);
  const map: Record<string, string> = {};
  data?.forEach((d) => {
    if (d.path && d.signedUrl) map[d.path] = d.signedUrl;
  });
  return map;
}

export async function resolveImages<T extends { image_url: string | null; images: string[] | null }>(rows: T[]) {
  const paths = rows.flatMap((r) => [r.image_url, ...(r.images ?? [])]).filter((p): p is string => !!p && !p.startsWith("http"));
  const map = await signPaths([...new Set(paths)]);
  const url = (p: string | null) => (p ? (p.startsWith("http") ? p : map[p] ?? "") : "");
  return rows.map((r) => ({ ...r, imageSrc: url(r.image_url), imageSrcs: (r.images ?? []).map(url).filter(Boolean) }));
}

export async function fetchPublishedListings(): Promise<Listing[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("validated", true)
    .order("created_at", { ascending: false })
    .limit(MAX_LISTINGS);
  if (error) throw error;
  const rows = await resolveImages(data ?? []);
  return rows.map((r) => ({
    id: r.id,
    title: r.title,
    type: r.type ?? "Imóvel",
    status: r.status ?? "Venda e Locação",
    price: r.price ?? "Sob Consulta",
    location: r.location ?? "Consulte",
    image: r.imageSrc || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
    beds: r.beds ?? 0,
    baths: r.baths ?? 0,
    area: r.area ?? "-",
    description: r.description ?? "",
  }));
}

export type SubmitInput = {
  ownerName: string;
  ownerPhone: string;
  title: string;
  type: string;
  location: string;
  area: string;
  beds: number;
  baths: number;
  price: string;
  documentation: string;
  description: string;
  files: File[];
};

export async function submitListing(input: SubmitInput) {
  const paths: string[] = [];
  for (const file of input.files.slice(0, 10)) {
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, { contentType: file.type });
    if (error) throw error;
    paths.push(path);
  }
  const { data: sess } = await supabase.auth.getSession();
  const { error } = await supabase.from("properties").insert({
    title: input.title.slice(0, 120),
    type: input.type,
    status: "Venda e Locação",
    location: input.location,
    area: input.area ? `${input.area}m²` : null,
    beds: input.beds,
    baths: input.baths,
    price: input.price || "Sob Consulta",
    documentation: input.documentation,
    description:
      input.description ||
      `${input.type} em ${input.location}${input.area ? `, ${input.area}m²` : ""}${input.beds ? `, ${input.beds} quarto(s)` : ""}${input.baths ? `, ${input.baths} banheiro(s)` : ""}. ${input.documentation}.`,
    owner_name: input.ownerName,
    owner_phone: input.ownerPhone,
    image_url: paths[0] ?? null,
    images: paths,
    created_by: sess.session?.user.id ?? null,
  });
  if (error) throw error;
}
