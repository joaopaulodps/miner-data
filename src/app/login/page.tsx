import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">MinerData</h1>
          <p className="text-gray-500 mt-2">Área administrativa</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
