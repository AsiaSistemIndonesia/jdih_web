"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Newspaper,
  User,
  Tag,
  Share2,
  Clock3,
} from "lucide-react";

import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";
import { useBeritaDetailWeb } from "@/feature/web";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function BeritaDetailPage({ params }: PageProps) {
  const { id } = use(params);

  const beritaId = Number(id);

  const { data: berita, isLoading, isError } = useBeritaDetailWeb(beritaId);

  if (isLoading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-background">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="h-5 w-32 animate-pulse rounded bg-secondary" />

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_280px]">
              <div>
                <div className="h-10 w-4/5 animate-pulse rounded bg-secondary" />
                <div className="mt-3 h-10 w-3/5 animate-pulse rounded bg-secondary" />

                <div className="mt-6 h-[420px] animate-pulse rounded-2xl bg-secondary" />

                <div className="mt-8 space-y-3">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <div
                      key={item}
                      className="h-4 animate-pulse rounded bg-secondary"
                    />
                  ))}
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="h-48 animate-pulse rounded-2xl bg-secondary" />
              </div>
            </div>
          </div>
        </main>

        <SiteFooter />
      </>
    );
  }

  if (isError || !berita) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[70vh] items-center justify-center bg-background px-4">
          <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Newspaper className="h-8 w-8 text-primary" />
            </div>

            <h1 className="mt-5 text-xl font-bold text-foreground">
              Berita Tidak Ditemukan
            </h1>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Berita yang Anda cari tidak tersedia atau telah dihapus.
            </p>

            <Link
              href="/berita"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>
          </div>
        </main>

        <SiteFooter />
      </>
    );
  }

  const imageUrl = berita.gambar
    ? berita.gambar.startsWith("http")
      ? berita.gambar
      : `/uploads/berita/${berita.gambar}`
    : null;

  return (
    <>
      <Navbar />

      <section className="relative isolate overflow-hidden border-b border-border bg-gradient-to-br from-primary/[0.09] via-background to-secondary/60">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "42px 42px",
            }}
          />

          <div className="absolute -left-32 -top-32 h-80 w-80 animate-pulse rounded-full bg-primary/10 blur-3xl" />

          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-primary/[0.08] blur-3xl" />

          <div className="absolute bottom-[-140px] left-1/3 h-80 w-80 rounded-full bg-primary/[0.06] blur-3xl" />

          <div className="absolute right-[10%] top-1/2 hidden -translate-y-1/2 lg:block">
            <div className="relative h-52 w-64 opacity-60">
              <div className="absolute left-1/2 top-1/2 h-40 w-52 -translate-x-1/2 -translate-y-1/2 rotate-6 rounded-2xl border border-primary/10 bg-background/40 shadow-2xl backdrop-blur-md" />

              <div className="absolute left-1/2 top-1/2 h-40 w-52 -translate-x-1/2 -translate-y-1/2 -rotate-6 rounded-2xl border border-primary/10 bg-background/40 shadow-xl backdrop-blur-md" />

              <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 animate-bounce items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-xl shadow-primary/20">
                <Newspaper className="h-6 w-6" />
              </div>

              <div className="absolute left-10 top-8 h-2 w-20 rounded-full bg-primary/10" />

              <div className="absolute right-8 top-16 h-2 w-16 rounded-full bg-primary/10" />

              <div className="absolute bottom-10 left-14 h-2 w-24 rounded-full bg-primary/10" />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Newspaper className="h-5 w-5" />

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-background bg-primary" />
              </div>

              <div>
                <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  JDIH BIN
                </p>
                <h1 className="mt-0.5 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  Detail Berita
                </h1>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
              Informasi, kegiatan, dan kabar terbaru seputar Jaringan
              Dokumentasi dan Informasi Hukum Badan Intelijen Negara.
            </p>

            <div className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
              <Link
                href="/"
                className="font-medium text-foreground transition-colors hover:text-primary"
              >
                Beranda
              </Link>

              <ChevronRight className="h-3.5 w-3.5 text-primary" />

              <span>Berita</span>
              <ChevronRight className="h-3.5 w-3.5 text-primary" />

              <span>Detail Berita</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTENT
      ============================================================ */}
      <main className="relative min-h-screen overflow-hidden bg-background">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-[-120px] top-40 h-72 w-72 rounded-full bg-primary/[0.035] blur-3xl" />

          <div className="absolute right-[-100px] top-[35%] h-80 w-80 rounded-full bg-primary/[0.035] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            {/* ======================================================
                ARTIKEL
            ====================================================== */}
            <article>
              {/* Kategori */}
              <div className="flex flex-wrap items-center gap-2">
                {berita.kategori && (
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    <Tag className="h-3 w-3" />
                    {berita.kategori}
                  </span>
                )}
              </div>

              {/* Judul */}
              <h2 className="mt-4 max-w-4xl font-display text-lg font-bold leading-snug tracking-tight text-foreground sm:text-xl lg:text-2xl">
                {berita.judul}
              </h2>

              {/* Metadata */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 border-b border-border pb-6 text-xs text-muted-foreground">
                {berita.tanggal_berita && (
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-primary" />
                    <span>{formatDate(berita.tanggal_berita)}</span>
                  </div>
                )}

                {berita.penulis && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>{berita.penulis}</span>
                  </div>
                )}
              </div>

              {/* Gambar utama */}
              <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-border bg-secondary shadow-xl shadow-black/5">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={berita.judul}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 850px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 via-secondary to-primary/5">
                    <Newspaper className="h-20 w-20 text-primary/15" />
                  </div>
                )}
              </div>

              {/* Isi berita */}
              <div className="mt-10">
                <div
                  className="
                    prose
                    prose-sm
                    max-w-none
                    text-foreground
                    sm:prose-base
                    prose-headings:font-display
                    prose-headings:font-bold
                    prose-headings:text-foreground
                    prose-p:leading-8
                    prose-p:text-muted-foreground
                    prose-a:text-primary
                    prose-strong:text-foreground
                    prose-li:text-muted-foreground
                    prose-img:rounded-2xl
                  "
                  dangerouslySetInnerHTML={{
                    __html: berita.isi_berita ?? "",
                  }}
                />
              </div>

              {/* Footer artikel */}
              <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke daftar berita
                </Link>
              </div>
            </article>

            {/* ======================================================
                SIDEBAR
            ====================================================== */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Newspaper className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-foreground">
                      Informasi Berita
                    </h2>
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {berita.kategori && (
                    <InfoItem
                      icon={<Tag className="h-4 w-4" />}
                      label="Kategori"
                      value={berita.kategori}
                    />
                  )}

                  {berita.penulis && (
                    <InfoItem
                      icon={<User className="h-4 w-4" />}
                      label="Penulis"
                      value={berita.penulis}
                    />
                  )}

                  {berita.tanggal_berita && (
                    <InfoItem
                      icon={<CalendarDays className="h-4 w-4" />}
                      label="Tanggal"
                      value={formatDate(berita.tanggal_berita)}
                    />
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}

/* ================================================================
   COMPONENT
================================================================ */

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 shrink-0 text-primary">{icon}</div>

      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 break-words text-xs font-semibold text-foreground">
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   HELPERS
================================================================ */

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

function getStatusLabel(value: boolean | number | string | null | undefined) {
  if (
    value === true ||
    value === 1 ||
    value === "1" ||
    value === "Aktif" ||
    value === "aktif"
  ) {
    return "Aktif";
  }

  return "Tidak Aktif";
}

async function handleShare(title: string) {
  if (typeof window === "undefined") {
    return;
  }

  const url = window.location.href;

  if (navigator.share) {
    try {
      await navigator.share({
        title,
        url,
      });
    } catch {
      // User membatalkan share
    }

    return;
  }

  try {
    await navigator.clipboard.writeText(url);

    alert("Link berita berhasil disalin.");
  } catch {
    alert("Gagal menyalin link berita.");
  }
}
