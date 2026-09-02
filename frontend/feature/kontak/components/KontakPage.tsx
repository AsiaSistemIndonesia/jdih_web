
// "use client";

// import { useState } from "react";
// import {
//   usePathname,
//   useRouter,
//   useSearchParams,
// } from "next/navigation";

// import DataTable, {
//   type DataTableColumn,
// } from "@/components/ui/DataTable";


// import {
//   useKontakList,
// } from "../hooks/Kontak.hooks";

// import { KontakRequest } from "../types/Kontak.type";

// interface Kontak extends KontakRequest {
//   id: number;
//   createdAt: string;
// }

// export default function KontakComponent() {
//   const router = useRouter();
//   const pathname = usePathname();
//   const searchParams = useSearchParams();

//   const page = Number(
//     searchParams.get("page") ?? "0"
//   );

//   const size = Number(
//     searchParams.get("size") ?? "10"
//   );

//   const search =
//     searchParams.get("search") ?? "";

//   const sort =
//     searchParams.get("sort") ?? "";

//   const params = {
//     page,
//     size,
//     search,
//     sort,
//   };

//   const {
//     data: response,
//     isLoading,
//     isFetching,
//     refetch,
//   } = useKontakList(params);


//   const data: Kontak[] =
//     (response as any)?.content ??
//     (response as any)?.data ??
//     [];

//   const totalElements =
//     (response as any)?.totalElements ??
//     (response as any)?.total ??
//     data.length;

//   const totalPages =
//     (response as any)?.totalPages ??
//     Math.ceil(totalElements / size);

//   const updateParams = (
//     changes: Record<
//       string,
//       string | number | null
//     >
//   ) => {
//     const params =
//       new URLSearchParams(
//         searchParams.toString()
//       );

//     Object.entries(changes).forEach(
//       ([key, value]) => {
//         if (
//           value === null ||
//           value === ""
//         ) {
//           params.delete(key);
//         } else {
//           params.set(
//             key,
//             String(value)
//           );
//         }
//       }
//     );

//     router.push(
//       `${pathname}?${params.toString()}`
//     );
//   };

//   const columns:
//     DataTableColumn<Kontak>[] = [

//     {
//       key: "nama",
//       label: "Nama",
//       sortable: true,
//     },
//     {
//       key: "email",
//       label: "Email",
//       sortable: true,
//     },
//     {
//       key: "subject",
//       label: "Subject",
//       sortable: false,
//     },
//     {
//       key: "pesan",
//       label: "Pesan",
//       sortable: false,
//     },

//     {
//   key: "created_at",
//   label: "Dikirim",
//   sortable: false,

//   render: (value) => {
//     if (!value) {
//       return (
//         <span className="text-sm text-slate-400">
//           -
//         </span>
//       );
//     }

//     const date = new Date(String(value));

//     if (isNaN(date.getTime())) {
//       return (
//         <span className="text-sm text-slate-400">
//           -
//         </span>
//       );
//     }

//     return (
//       <span className="text-sm text-slate-500">
//         {date.toLocaleDateString("id-ID", {
//           day: "2-digit",
//           month: "2-digit",
//           year: "numeric",
//         })}
//       </span>
//     );
//   },
// },
//   ];

//   return (
//     <div className="min-h-screen bg-[#F8FAFC] px-5 py-8 sm:px-7 lg:px-8 lg:py-10">
//       <div className="mx-auto max-w-[1600px]">
//         <DataTable
//           data={data}
//           columns={columns}
//           getRowId={(row) => row.id}
//           title="Kontak"
//           description="Kelola informasi masukan yang ditampilkan pada halaman utama website JDIH."
//           searchPlaceholder="Cari judul atau keterangan..."
          
//           onRefresh={refetch}
//           loading={
//             isLoading || isFetching
//           }
//           page={page}
//           size={size}
//           totalElements={
//             totalElements
//           }
//           totalPages={totalPages}
//           currentSearch={search}
//           currentSort={sort}
//           onPageChange={(newPage) =>
//             updateParams({
//               page: newPage,
//             })
//           }
//           onSizeChange={(newSize) =>
//             updateParams({
//               size: newSize,
//               page: 0,
//             })
//           }
//           onSearch={(value) =>
//             updateParams({
//               search: value,
//               page: 0,
//             })
//           }
//           onSort={(key, direction) =>
//             updateParams({
//               sort: direction
//                 ? `${key},${direction}`
//                 : null,
//               page: 0,
//             })
//           }
//           pageSizeOptions={[
//             10,
//             20,
//             50,
//             100,
//           ]}
//         />
//       </div>

//     </div>
//   );
// }

"use client";

import { useMemo } from "react";

import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

import DataTable, {
  type DataTableColumn,
} from "@/components/ui/DataTable";

import {
  useKontakList,
} from "../hooks/Kontak.hooks";

import {
  KontakRequest,
} from "../types/Kontak.type";

interface Kontak extends KontakRequest {
  kontak_id: string | number;
  nama: string;
  email: string;
  subject: string;
  pesan: string;
  created_at?: string;
  updated_at?: string;
}

interface KontakResponse {
  success: boolean;
  message: string;
  data: Kontak[];
  pagination: {
    page: number;
    size: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

export default function KontakComponent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawPage = Number(searchParams.get("page") ?? "1");
  const rawSize = Number(searchParams.get("size") ?? "10");

  const page = Number.isFinite(rawPage) && rawPage >= 1 ? rawPage : 1;
  const size = Number.isFinite(rawSize) && rawSize >= 1 ? rawSize : 10;

  const search = searchParams.get("search") ?? "";
  const sort = searchParams.get("sort") ?? "";

  const params = useMemo(
    () => ({
      page,
      size,
      search,
      sort,
    }),
    [page, size, search, sort]
  );

  const {
    data: response,
    isLoading,
    isFetching,
    refetch,
  } = useKontakList(params);

  const result = response as KontakResponse | undefined;

  const data: Kontak[] = result?.data ?? [];

  const totalElements = result?.pagination?.total ?? 0;

  const totalPages =
    result?.pagination?.totalPages ??
    Math.max(1, Math.ceil(totalElements / size));

  const updateParams = (
    changes: Record<string, string | number | null>
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  const columns: DataTableColumn<Kontak>[] = [
    {
      key: "nama",
      label: "Nama",
      sortable: true,
    },
    {
      key: "email",
      label: "Email",
      sortable: true,
    },
    {
      key: "subject",
      label: "Subject",
      sortable: false,
    },
    {
      key: "pesan",
      label: "Pesan",
      sortable: false,
    },
    {
      key: "created_at",
      label: "Dikirim",
      sortable: false,
      render: (value) => {
        if (!value) {
          return (
            <span className="text-sm text-slate-400">
              -
            </span>
          );
        }

        const date = new Date(String(value));

        if (Number.isNaN(date.getTime())) {
          return (
            <span className="text-sm text-slate-400">
              -
            </span>
          );
        }

        return (
          <span className="text-sm text-slate-500">
            {date.toLocaleDateString("id-ID", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-5 py-8 sm:px-7 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-[1600px]">
        <DataTable<Kontak>
          data={data}
          columns={columns}
          getRowId={(row) => String(row.kontak_id)}
          title="Kontak"
          description="Kelola informasi masukan yang ditampilkan pada halaman utama website JDIH."
          searchPlaceholder="Cari nama, email, atau subject..."
          onRefresh={refetch}
          loading={isLoading || isFetching}
          page={page - 1}
          size={size}
          totalElements={totalElements}
          totalPages={totalPages}
          currentSearch={search}
          currentSort={sort}
          onPageChange={(newPage) => {
            updateParams({
              page: newPage + 1,
            });
          }}
          onSizeChange={(newSize) => {
            updateParams({
              size: newSize,
              page: 1,
            });
          }}
          onSearch={(value) => {
            updateParams({
              search: value,
              page: 1,
            });
          }}
          onSort={(key, direction) => {
            updateParams({
              sort: direction
                ? `${key},${direction}`
                : null,
              page: 1,
            });
          }}
          pageSizeOptions={[10, 20, 50, 100]}
        />
      </div>
    </div>
  );
}