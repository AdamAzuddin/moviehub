import Header from "@/components/Header";
import { LayoutProps } from "@/types/types";
export default function HomeLayout({ children }: LayoutProps) {
  return (
    <div>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
}
