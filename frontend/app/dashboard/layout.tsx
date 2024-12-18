import { AuthProvider } from '../../components/context/auth-context';

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>,) {
  return (
    <div className="h-full w-full bg-white">
        <AuthProvider>
          {children}
        </AuthProvider>
     </div>
  );
}
