import { LayoutProps } from '@/types/types';
export default function AuthLayout({ children }: LayoutProps) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
