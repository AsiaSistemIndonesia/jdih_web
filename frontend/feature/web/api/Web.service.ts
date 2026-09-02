import { createApiClient } from "@/lib/api";
import { PaginationParams, SpringPage } from "@/types/GlobalType";
import { BeritaWebResponse, FetchWebBeritaParams, Sumary } from "../types/Web.type";
import { Slider } from "@/feature/slider";
import { Berita } from "@/feature/berita/types/Berita.type";
import { DokumenHukum } from "@/feature/dokumen-hukum/types/DokumenHukum.type";
import { Kontak, KontakRequest } from "@/feature/kontak";

const api = createApiClient("/master-data");

export const fetchWebSliderAll = async (): Promise<Slider[]> => {
  const res = await api.get("/slider/all");
  return res.data;
};

export const fetchWebSumaryAll = async (): Promise<Sumary[]> => {
  const res = await api.get("/dokumen-hukum/sumary");
  return res.data;
};

export const fetchWebSumaryDashboard = async (): Promise<any> => {
  const res = await api.get("/pengaturan/sumary");
  return res.data;
};

export const fetchWebGrafik = async (): Promise<any> => {
  const res = await api.get("/pengaturan/sumary-grafik");
  return res.data;
};

export const fetchWebBeritaAll = async (): Promise<Berita[]> => {
  const res = await api.get("/berita/all");
  return res.data;
};

export const fetchWebDokumenHukumAll = async (): Promise<DokumenHukum[]> => {
  const res = await api.get("/dokumen-hukum/all");
  return res.data;
};

export const fetchWebDokumenHukum = async (
  params: PaginationParams,
): Promise<SpringPage<DokumenHukum>> => {
  const res = await api.get("/dokumen-hukum/web", { params });
  return res.data;
};

export const fetchByIdWebDokumenHukum = async (
  id: number,
): Promise<DokumenHukum> => {
  const res = await api.get(`/dokumen-hukum/${id}`);
  return res.data.data;
};

export const fetchWebKontakAll = async (): Promise<Kontak[]> => {
  const res = await api.get("/pengaturan");
  return res.data;
};

export const createKontak = async (
  data: KontakRequest,
): Promise<KontakRequest> => {
  const res = await api.post("/kontak", data);
  return res.data.data;
};

export const Login = async (
  data: any,
): Promise<any> => {
  const res = await api.post("/login", data);
  return res.data.data;
};

export const getSession = async () => {
  const res = await api.get("/login/session");
  return res.data;
};

export const getLogout = async () => {
  const res = await api.post("/login/logout");
  return res.data;
};


export const fetchWebBeritaResult = async ({
  page = 1,
  size = 10,
}: FetchWebBeritaParams = {}): Promise<BeritaWebResponse> => {
  const res = await api.get<BeritaWebResponse>("/berita/pagination-berita", {
    params: { page, size },
  });
  return res.data;
};


export const fetchByIdBerita = async (
  id: number
): Promise<Berita> => {
  const res = await api.get(`/berita/${id}`);
  return res.data.data;
};
