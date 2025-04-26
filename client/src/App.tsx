import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import CategoryPage from "@/pages/CategoryPage";
import JoinClub from "@/pages/JoinClub";
import WeeklyPacks from "@/pages/WeeklyPacks";
import TwilightTidesPage from "@/pages/TwilightTidesPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ScrollToTop component will reset scroll position on route changes */}
      <ScrollToTop />
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        {/* Legacy route - will be removed after migration */}
        <Route path="/category/:id" component={CategoryPage} />
        {/* New dedicated category pages */}
        <Route path="/twilight-tides" component={TwilightTidesPage} />
        <Route path="/join-club" component={JoinClub} />
        <Route path="/weekly-packs" component={WeeklyPacks} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
