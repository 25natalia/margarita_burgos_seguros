import type { Metadata, Viewport } from "next";
import { Questrial } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

// Títulos. El texto usa Helvetica Neue del sistema (ver globals.css).
const questrial = Questrial({
  variable: "--font-questrial",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Margarita Burgos · Asesora de seguros en Colombia",
  description:
    "Asesoría personalizada en seguros de vida, salud, auto y hogar. Escríbele a Margarita Burgos por WhatsApp y recibe una cotización sin compromiso.",
};

// viewportFit "cover" activa env(safe-area-inset-*) en iPhone (botón flotante).
export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#3a22b2",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${questrial.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
