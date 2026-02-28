/**
 * (auth) group layout
 * Shared layout for all unauthenticated pages (login, forgot-password, reset-password).
 * Provides the centered card shell.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Brand logo area */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-600 tracking-tight">
            Irukei
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Learning · irukei · NestJS
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
