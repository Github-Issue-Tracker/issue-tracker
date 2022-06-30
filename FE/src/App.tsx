import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { RecoilRoot } from "recoil";

import Spinner from "@/components/common/Spinner";
import Routers from "@/routers";

const App = () => {
  // FIXME: 임시 OAuth
  const isOAuth = true;

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: false,
        enabled: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Spinner />}>
          <Routers isOAuth={isOAuth} />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export default App;
