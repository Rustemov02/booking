import { Button } from "./ui/button";
import { Hotel, Globe, User } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-lg">
            <Hotel className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">Hotels.com</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 hidden sm:flex">
            <Globe className="h-4 w-4" />
            <span>English</span>
          </Button>
          <Button variant="outline" size="sm">
            Sign in
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
}
