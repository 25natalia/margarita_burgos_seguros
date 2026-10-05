import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
  themeColor: "#0e4d64",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
