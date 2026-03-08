import { ReactNode } from "react";
import GuestHeader from "../../components/header/GuestHeader";

interface Props {
  children: ReactNode;
}

const AuthLayoutWrapper = ({ children }: Props) => {

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <GuestHeader />

      {/* Main content */}
      <main className="flex flex-1 justify-center items-center px-4 py-12 bg-gray-50/50">
        <div className="w-full max-w-2xl">
          {/* Children (Login/Register form) */}
          {children}

          {/* Social login - Hidden temporarily as requested */}
          {/* <div className="max-w-md mx-auto mt-8 px-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-gray-500">Or continue with</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl flex items-center justify-center gap-3 border-gray-200 hover:bg-gray-50 transition-all font-medium"
              onClick={() => { }}
            >
              <Google className="w-5 h-5" />
              <span>Google</span>
            </Button>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default AuthLayoutWrapper;
