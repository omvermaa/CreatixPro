import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-20 bg-secondary">
      <SignUp />
    </div>
  );
}
