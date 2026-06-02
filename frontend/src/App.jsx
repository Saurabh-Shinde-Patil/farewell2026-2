import Navbar from "./components/Navbar";
import Mosaic from "./components/Mosaic";
import VideoSection from "./components/VideoSection";
import Gallery from "./components/Gallery";
import ImageSlider from "./components/ImageSlider";
import MessagesSection from "./components/MessagesSection";
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";

/**
 * Main application component stacking the SPA layout for Vite + React.
 */
export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Mosaic />
          <ImageSlider />
          <VideoSection />
          <MessagesSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
