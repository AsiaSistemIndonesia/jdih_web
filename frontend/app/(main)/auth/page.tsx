"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type CSSProperties,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Scale,
} from "lucide-react";

import { LoginHook, SessionHook } from "@/feature/web";

type Status = "idle" | "loading" | "success";

interface CursorPos {
  x: number;
  y: number;
}

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const [pos, setPos] = useState<CursorPos>({
    x: 50,
    y: 50,
  });

  const [checkingSession, setCheckingSession] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * LOGIN
   */
  const loginMutation = LoginHook();

  /**
   * CEK SESSION
   *
   * Route:
   * GET /api/master-data/login/session
   */
  const sessionQuery = SessionHook();

  /**
   * Jika user sudah login,
   * jangan izinkan halaman login dibuka.
   */
  useEffect(() => {
    if (sessionQuery.isLoading) {
      return;
    }

    if (sessionQuery.data?.success) {
      router.replace("/admin/dashboard");
      return;
    }

    /**
     * 401 dianggap belum login.
     * Maka form login boleh ditampilkan.
     */
    setCheckingSession(false);
  }, [
    sessionQuery.isLoading,
    sessionQuery.data,
    router,
  ]);

  /**
   * HANDLE MOUSE
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect =
        containerRef.current?.getBoundingClientRect();

      if (!rect) return;

      const x =
        ((e.clientX - rect.left) / rect.width) * 100;

      const y =
        ((e.clientY - rect.top) / rect.height) * 100;

      setPos({ x, y });
    },
    [],
  );

  /**
   * HANDLE LOGIN
   */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (loginMutation.isPending || status === "success") {
      return;
    }

    const cleanEmail = email.trim();

    if (!cleanEmail) {
      return;
    }

    if (!password) {
      return;
    }

    try {
      setStatus("loading");

      await loginMutation.mutateAsync({
        email: cleanEmail,
        password,
        remember,
      });

      setStatus("success");

      /**
       * Session sudah dibuat oleh backend.
       * Setelah login berhasil langsung ke admin.
       */
      setTimeout(() => {
        router.replace("/admin/dashboard");
        router.refresh();
      }, 500);
    } catch {
      setStatus("idle");
    }
  };

  /**
   * ============================
   * LOADING CEK SESSION
   * ============================
   *
   * Jangan tampilkan form login
   * sebelum status session diketahui.
   */
  if (checkingSession || sessionQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <Loader2
            size={28}
            className="animate-spin text-[#1358A8]"
          />

          <p className="text-sm text-gray-500">
            Memeriksa sesi pengguna...
          </p>
        </div>
      </div>
    );
  }

  const BLUE = "#1358A8";
  const BLUE_DARK = "#0D3B73";
  const TEXT = "#172033";
  const MUTED = "#6B7280";
  const GOLD = "#C9A15A";
  const BORDER = "#E5E7EB";

  const fieldWrap = (
    focused: boolean,
  ): CSSProperties => ({
    borderColor: focused ? BLUE : BORDER,

    boxShadow: focused
      ? "0 0 0 4px rgba(19,88,168,0.08)"
      : "none",

    background: "#FFFFFF",
  });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white px-5 py-10 sm:px-8"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap');

        .jdih-sans {
          font-family: 'Inter', sans-serif;
        }

        .jdih-heading {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes jdih-fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes jdih-float {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes jdih-float-small {
          0%, 100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes jdih-pop {
          0% {
            transform: scale(0.7);
            opacity: 0;
          }

          60% {
            transform: scale(1.08);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .jdih-in {
          opacity: 0;
          animation:
            jdih-fade-up
            0.7s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .jdih-float {
          animation: jdih-float 5s ease-in-out infinite;
        }

        .jdih-float-small {
          animation: jdih-float-small 4s ease-in-out infinite;
        }

        .jdih-input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #172033;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
        }

        .jdih-input::placeholder {
          color: #9CA3AF;
        }

        @media (prefers-reduced-motion: reduce) {
          .jdih-in,
          .jdih-float,
          .jdih-float-small {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* BACKGROUND */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(19,88,168,0.07), transparent 68%)",
          }}
        />

        <div
          className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,161,90,0.06), transparent 68%)",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(
                500px circle at ${pos.x}% ${pos.y}%,
                rgba(19,88,168,0.035),
                transparent 65%
              )
            `,
            transition: "background 0.35s ease-out",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(19,88,168,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(19,88,168,0.035) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* MAIN */}
      <div className="relative z-10 w-full max-w-6xl">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_430px]">

          {/* LEFT */}
          <div className="hidden lg:block">
            <div
              className="jdih-in"
              style={{
                animationDelay: "0.05s",
              }}
            >
              <div className="mb-8 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: BLUE,
                    boxShadow:
                      "0 12px 30px rgba(19,88,168,0.18)",
                  }}
                >
                  <Scale
                    size={28}
                    color="white"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <div
                    className="jdih-heading text-[25px] font-extrabold tracking-tight"
                    style={{
                      color: BLUE_DARK,
                    }}
                  >
                    JDIH
                  </div>

                  <div
                    className="jdih-sans text-[11px] font-medium uppercase tracking-[0.14em]"
                    style={{
                      color: MUTED,
                    }}
                  >
                    Jaringan Dokumentasi
                  </div>
                </div>
              </div>

              <h2
                className="jdih-heading max-w-xl text-4xl font-extrabold leading-[1.18] tracking-tight xl:text-5xl"
                style={{
                  color: TEXT,
                }}
              >
                Pusat Dokumentasi
                <br />

                <span style={{ color: BLUE }}>
                  Informasi Hukum
                </span>
              </h2>

              <p
                className="jdih-sans mt-6 max-w-lg text-[15px] leading-7"
                style={{
                  color: MUTED,
                }}
              >
                Akses dan kelola dokumentasi serta informasi
                hukum secara terintegrasi melalui Portal JDIH.
                Temukan produk hukum, peraturan, keputusan,
                dan berbagai dokumen hukum dalam satu sistem.
              </p>

              <div className="relative mt-10 h-[300px] w-full max-w-[590px]">
                <div
                  className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(234,242,255,0.95), rgba(234,242,255,0.35) 55%, transparent 72%)",
                  }}
                />

                <div
                  className="absolute left-[18%] top-[12%] h-3 w-3 rounded-full"
                  style={{
                    background: GOLD,
                    opacity: 0.65,
                  }}
                />

                <div
                  className="absolute right-[17%] top-[23%] h-2 w-2 rounded-full"
                  style={{
                    background: BLUE,
                    opacity: 0.45,
                  }}
                />

                <div
                  className="absolute bottom-[18%] left-[27%] h-2 w-2 rounded-full"
                  style={{
                    background: GOLD,
                    opacity: 0.5,
                  }}
                />

                <div className="jdih-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* SVG KAMU YANG SEKARANG TETAP DI SINI */}
                  {/* Tidak perlu diubah */}
                </div>
              </div>

              <div className="mt-2 flex items-center gap-3">
                <div
                  className="h-px w-10"
                  style={{
                    background: GOLD,
                  }}
                />

                <span
                  className="jdih-sans text-[10px] font-medium uppercase tracking-[0.14em]"
                  style={{
                    color: "#9CA3AF",
                  }}
                >
                  Dokumentasi • Regulasi • Informasi Hukum
                </span>
              </div>
            </div>
          </div>

          {/* LOGIN */}
          <div className="w-full">
            <div
              className="jdih-in rounded-[26px] border bg-white p-7 shadow-[0_25px_70px_rgba(15,23,42,0.08)] sm:p-9"
              style={{
                borderColor: "#E6EAF0",
                animationDelay: "0.12s",
              }}
            >
              {/* MOBILE LOGO */}
              <div className="mb-7 flex flex-col items-center lg:hidden">
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    background: BLUE,
                    boxShadow:
                      "0 10px 28px rgba(19,88,168,0.2)",
                  }}
                >
                  <Scale
                    size={27}
                    color="white"
                    strokeWidth={1.8}
                  />
                </div>

                <div
                  className="jdih-heading text-xl font-extrabold"
                  style={{
                    color: BLUE_DARK,
                  }}
                >
                  JDIH
                </div>

                <div
                  className="jdih-sans mt-1 text-center text-[10px] font-medium uppercase tracking-[0.12em]"
                  style={{
                    color: MUTED,
                  }}
                >
                  Jaringan Dokumentasi & Informasi Hukum
                </div>
              </div>

              {/* HEADER */}
              <div className="mb-8">
                <div
                  className="jdih-sans mb-2 text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{
                    color: BLUE,
                  }}
                >
                  Portal JDIH
                </div>

                <h1
                  className="jdih-heading text-[28px] font-extrabold tracking-tight"
                  style={{
                    color: TEXT,
                  }}
                >
                  Selamat Datang
                </h1>

                <p
                  className="jdih-sans mt-2 text-[13px] leading-6"
                  style={{
                    color: MUTED,
                  }}
                >
                  Masuk untuk mengakses layanan dan
                  dokumentasi informasi hukum.
                </p>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>

                {/* EMAIL */}
                <div
                  className="jdih-in mb-5"
                  style={{
                    animationDelay: "0.22s",
                  }}
                >
                  <label
                    className="jdih-sans mb-2 block text-xs font-semibold"
                    style={{
                      color: TEXT,
                    }}
                  >
                    Alamat Email
                  </label>

                  <div
                    className="flex h-[52px] items-center gap-3 rounded-xl border px-4 transition-all duration-200"
                    style={{
                      ...fieldWrap(emailFocused),
                    }}
                  >
                    <Mail
                      size={17}
                      strokeWidth={1.8}
                      color={
                        emailFocused
                          ? BLUE
                          : "#9CA3AF"
                      }
                    />

                    <input
                      type="email"
                      className="jdih-input"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      onFocus={() =>
                        setEmailFocused(true)
                      }
                      onBlur={() =>
                        setEmailFocused(false)
                      }
                      placeholder="Masukkan alamat email"
                      autoComplete="email"
                      disabled={loginMutation.isPending}
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div
                  className="jdih-in mb-4"
                  style={{
                    animationDelay: "0.27s",
                  }}
                >
                  <label
                    className="jdih-sans mb-2 block text-xs font-semibold"
                    style={{
                      color: TEXT,
                    }}
                  >
                    Kata Sandi
                  </label>

                  <div
                    className="flex h-[52px] items-center gap-3 rounded-xl border px-4 transition-all duration-200"
                    style={{
                      ...fieldWrap(passwordFocused),
                    }}
                  >
                    <Lock
                      size={17}
                      strokeWidth={1.8}
                      color={
                        passwordFocused
                          ? BLUE
                          : "#9CA3AF"
                      }
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      className="jdih-input"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      onFocus={() =>
                        setPasswordFocused(true)
                      }
                      onBlur={() =>
                        setPasswordFocused(false)
                      }
                      placeholder="Masukkan kata sandi"
                      autoComplete="current-password"
                      disabled={loginMutation.isPending}
                    />

                    <button
                      type="button"
                      disabled={loginMutation.isPending}
                      onClick={() =>
                        setShowPassword((s) => !s)
                      }
                      className="shrink-0 border-0 bg-transparent p-1"
                    >
                      {showPassword ? (
                        <EyeOff
                          size={17}
                          color="#9CA3AF"
                        />
                      ) : (
                        <Eye
                          size={17}
                          color="#9CA3AF"
                        />
                      )}
                    </button>
                  </div>
                </div>


                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={
                    loginMutation.isPending ||
                    status === "success"
                  }
                  className="jdih-sans group jdih-in relative flex h-[52px] w-full items-center justify-center gap-2 overflow-hidden rounded-xl border-0 text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    background:
                      status === "success"
                        ? "#16A37A"
                        : `linear-gradient(
                            100deg,
                            ${BLUE_DARK},
                            ${BLUE}
                          )`,

                    boxShadow:
                      status === "idle"
                        ? "0 10px 24px rgba(19,88,168,0.18)"
                        : "none",

                    cursor:
                      loginMutation.isPending ||
                      status === "success"
                        ? "default"
                        : "pointer",

                    animationDelay: "0.37s",
                  }}
                >
                  {status === "idle" && (
                    <>
                      Masuk ke Portal

                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                  {status === "loading" && (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Memproses...
                    </>
                  )}

                  {status === "success" && (
                    <span
                      className="flex items-center gap-2"
                      style={{
                        animation:
                          "jdih-pop 0.4s ease",
                      }}
                    >
                      <Check
                        size={17}
                        strokeWidth={3}
                      />

                      Berhasil
                    </span>
                  )}
                </button>
              </form>

              {/* FOOTER */}
              <div
                className="jdih-in mt-7 border-t pt-6 text-center"
                style={{
                  borderColor: "#EEF0F3",
                  animationDelay: "0.42s",
                }}
              >
                <p
                  className="jdih-sans text-[11px] leading-5"
                  style={{
                    color: "#9CA3AF",
                  }}
                >
                  Akses terbatas untuk pengguna
                  yang telah terdaftar pada
                  sistem JDIH.
                </p>

                <div className="mt-4 flex items-center justify-center gap-2">
                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: GOLD,
                    }}
                  />

                  <span
                    className="jdih-sans text-[10px] font-medium uppercase tracking-[0.1em]"
                    style={{
                      color: "#9CA3AF",
                    }}
                  >
                    Jaringan Dokumentasi & Informasi Hukum
                  </span>

                  <div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: BLUE,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
