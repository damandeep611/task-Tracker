import Dashboard from "./components/Dashboard";
import SideBar from "./components/SideBar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";

function App() {
  return (
    <>
      <SidebarProvider>
        <SideBar />
        <main>
          <SidebarTrigger className="text-red-700" />
          <Dashboard />
        </main>
      </SidebarProvider>
    </>
  );
}

export default App;
