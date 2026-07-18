"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Locale, ui } from "@/lib/i18n";

type PartnerFormValues = {
  name: string;
  whatsapp: string;
  location: string;
  commodity: string;
  capacity: string;
  notes: string;
};

export function PartnerForm({ locale }: { locale: Locale }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = ui[locale].partnerForm;
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PartnerFormValues>({
    defaultValues: {
      name: "",
      whatsapp: "",
      location: "",
      commodity: "",
      capacity: "",
      notes: "",
    },
  });

  async function onSubmit(values: PartnerFormValues) {
    setIsSubmitting(true);
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            type: "partner_application",
            language: locale,
            source: "CO EXPORT.ID website",
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) throw new Error("Webhook failed");
        
        toast.success(copy.successTitle, {
          description: copy.successDesc,
        });
        reset();
      } else {
        // Fallback to WhatsApp
        const waText = `Halo CO EXPORT.ID, saya ingin mendaftar sebagai mitra pasok.

*Nama/Koordinator:* ${values.name}
*No. WhatsApp:* ${values.whatsapp}
*Lokasi:* ${values.location}
*Komoditas:* ${values.commodity}
*Kapasitas:* ${values.capacity}
*Catatan:* ${values.notes || "-"}`;

        const waUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(waText)}`;
        window.open(waUrl, "_blank");
        
        toast.success(copy.successTitle, {
          description: copy.successDesc,
        });
        reset();
      }
    } catch (error) {
      toast.error(copy.errorTitle, {
        description: copy.errorDesc,
      });
      // Fallback to WhatsApp on error
      const waUrl = `https://wa.me/6281234567890?text=Halo%20CO%20EXPORT.ID,%20saya%20ingin%20mendaftar%20sebagai%20mitra%20pasok.`;
      window.open(waUrl, "_blank");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="font-semibold text-foreground">
          {copy.nameLabel} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder={copy.namePlaceholder}
          {...register("name", { required: true })}
          className={errors.name ? "border-red-500" : ""}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="whatsapp" className="font-semibold text-foreground">
            {copy.whatsappLabel} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder={copy.whatsappPlaceholder}
            {...register("whatsapp", { required: true })}
            className={errors.whatsapp ? "border-red-500" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="font-semibold text-foreground">
            {copy.locationLabel} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="location"
            placeholder={copy.locationPlaceholder}
            {...register("location", { required: true })}
            className={errors.location ? "border-red-500" : ""}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="commodity" className="font-semibold text-foreground">
            {copy.commodityLabel} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="commodity"
            placeholder={copy.commodityPlaceholder}
            {...register("commodity", { required: true })}
            className={errors.commodity ? "border-red-500" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity" className="font-semibold text-foreground">
            {copy.capacityLabel} <span className="text-red-500">*</span>
          </Label>
          <Input
            id="capacity"
            placeholder={copy.capacityPlaceholder}
            {...register("capacity", { required: true })}
            className={errors.capacity ? "border-red-500" : ""}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes" className="font-semibold text-foreground">
          {copy.notesLabel}
        </Label>
        <Textarea
          id="notes"
          placeholder={copy.notesPlaceholder}
          rows={4}
          {...register("notes")}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" />
            {copy.submitting}
          </>
        ) : (
          <>
            <Send className="mr-2 size-5" />
            {copy.submitButton}
          </>
        )}
      </Button>
    </form>
  );
}
