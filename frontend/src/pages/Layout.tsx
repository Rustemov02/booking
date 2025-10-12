import { ReactNode } from "react";
import PageHeader from "../components/pageHeader/PageHeader";

const PageLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="">
      <PageHeader />
      {children}
      {/* <Footer /> */}
    </main>
  );
};

export default PageLayout;
