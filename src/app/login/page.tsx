import { LoginForm } from '@/components/login-form';

export default function LoginPage() {
  return (
    <div className="flex h-full items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Only administrators can sign in.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
