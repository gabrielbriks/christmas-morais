"use client";

import { trpc } from "@/src/app/_trpc/trpc-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { type PropsWithChildren, useState } from "react";
import { getBaseUrl } from "../utils/get-base-url";

const TrpcProvider = ({ children }: PropsWithChildren) => {
  //Defining instances QueryClient of react-query and Client Trpc
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;
