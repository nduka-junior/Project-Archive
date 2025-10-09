import SignInForm from "./SignInForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <SignInForm />
      </div>
    </div>
  );
}
