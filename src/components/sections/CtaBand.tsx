import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type CtaBandProps = {
  phoneDisplay: string;
};

export function CtaBand({ phoneDisplay }: CtaBandProps) {
  const waUrl = buildWhatsAppUrl({
    text: "Halo SpaceNet, saya mau bertanya tentang pemasangan internet di Samarinda.",
  });

  return (
    <section className="border-y border-line bg-ink">
      <div className="wrap flex flex-col items-start gap-6 py-12 sm:flex-row sm:items-center sm:justify-between sm:py-14">
        <div>
          <h2 className="text-2xl text-bg sm:text-3xl">Siap berlangganan SpaceNet?</h2>
          <p className="measure mt-3 text-sm leading-relaxed text-bg">
            Isi formulir pendaftaran atau hubungi WhatsApp kami di {phoneDisplay}. Tim kami akan
            mengonfirmasi ketersediaan jaringan di alamat Anda.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/daftar" size="lg">
            Daftar sekarang
          </ButtonLink>
          <ButtonLink href={waUrl} external variant="secondary" size="lg">
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
