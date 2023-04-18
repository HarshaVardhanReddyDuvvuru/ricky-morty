import { render } from "@testing-library/react";
import Home from "@/pages/index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

it("Home renders correctly", () => {
  const tree = render(
    <>
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </>
  );
  expect(tree).toMatchSnapshot();
});
