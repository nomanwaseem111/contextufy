"use client";
import Button from "@/components/Button/page";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { actions,states } = useAuth();


  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4  px-10 flex justify-between items-center w-full bg-[#FFFFFF]">
        <div>
          <h1 className="text-xl font-semibold font-[manrope] text-emerald-500">
            Contextufy
          </h1>
        </div>
        <Button loading={states.isLoader} className="!w-[100px]" onClick={() => actions.handleLogout()}>
          Logout
        </Button>
      </header>

      <main className="flex-1 flex text-xl items-center font-[manrope] justify-center p-4 bg-[#f3f6f5]">
        Landing Page
      </main>

      <footer className="p-4 font-[inter] bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Community Standards
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Feedback
          </a>
          <a href="#" className="hover:underline">
            Help
          </a>
        </div>
      </footer>
    </div>
  );
}
