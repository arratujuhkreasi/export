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

type InquiryForm = {
  name: string;
  company: string;
  email: string;
  productInterest: string;
  message: string;
};

export function ContactForm({
  defaultProductInterest = "",
  locale,
}: {
  defaultProductInterest?: string;
  locale: Locale;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copy = ui[locale].contact;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InquiryForm>({
    defaultValues: {
      name: "",
      company: "",
      email: "",
      productInterest: defaultProductInterest,
      message: "",
    },
  });

  async function onSubmit(values: InquiryForm) {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact_inquiry",
          inquiry: {
            ...values,
            language: locale,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Inquiry request failed");
      }

      const result = (await response.json()) as { delivery?: string };
      toast.success(result.delivery === "webhook" ? copy.successWebhook : copy.successDemo);
      reset();
    } catch {
      toast.error(copy.error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name" className="text-sm font-medium">{copy.labels.name}</Label>
        <div className="focus-glow rounded-lg transition-all duration-300">
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className="border-border/60 transition-colors duration-200 focus:border-[#1d6b4f]"
            {...register("name", { required: copy.required.name })}
          />
        </div>
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company" className="text-sm font-medium">{copy.labels.company}</Label>
        <div className="focus-glow rounded-lg transition-all duration-300">
          <Input
            id="company"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            className="border-border/60 transition-colors duration-200 focus:border-[#1d6b4f]"
            {...register("company", { required: copy.required.company })}
          />
        </div>
        {errors.company ? <p className="text-sm text-destructive">{errors.company.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email" className="text-sm font-medium">{copy.labels.email}</Label>
        <div className="focus-glow rounded-lg transition-all duration-300">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className="border-border/60 transition-colors duration-200 focus:border-[#1d6b4f]"
            {...register("email", {
              required: copy.required.email,
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: copy.required.validEmail,
              },
            })}
          />
        </div>
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="productInterest" className="text-sm font-medium">{copy.labels.productInterest}</Label>
        <div className="focus-glow rounded-lg transition-all duration-300">
          <Input
            id="productInterest"
            placeholder={copy.placeholders.productInterest}
            aria-invalid={Boolean(errors.productInterest)}
            className="border-border/60 transition-colors duration-200 focus:border-[#1d6b4f]"
            {...register("productInterest", { required: copy.required.productInterest })}
          />
        </div>
        {errors.productInterest ? (
          <p className="text-sm text-destructive">{errors.productInterest.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message" className="text-sm font-medium">{copy.labels.message}</Label>
        <div className="focus-glow rounded-lg transition-all duration-300">
          <Textarea
            id="message"
            rows={5}
            placeholder={copy.placeholders.message}
            aria-invalid={Boolean(errors.message)}
            className="border-border/60 transition-colors duration-200 focus:border-[#1d6b4f]"
            {...register("message", { required: copy.required.message })}
          />
        </div>
        {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
      </div>
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 bg-[#1d6b4f] shadow-lg shadow-[#1d6b4f]/20 transition-all duration-300 hover:bg-[#174f3b] hover:shadow-xl hover:shadow-[#1d6b4f]/25 active:scale-[0.98]"
      >
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {copy.submit}
      </Button>
    </form>
  );
}
