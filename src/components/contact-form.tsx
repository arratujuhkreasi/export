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
    const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;

    try {
      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            language: locale,
            source: "Nusantara Harvest Co. website",
            submittedAt: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error("Webhook request failed");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 650));
      }

      toast.success(webhookUrl ? copy.successWebhook : copy.successDemo);
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
        <Label htmlFor="name">{copy.labels.name}</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register("name", { required: copy.required.name })}
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company">{copy.labels.company}</Label>
        <Input
          id="company"
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          {...register("company", { required: copy.required.company })}
        />
        {errors.company ? <p className="text-sm text-destructive">{errors.company.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">{copy.labels.email}</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: copy.required.email,
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: copy.required.validEmail,
            },
          })}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="productInterest">{copy.labels.productInterest}</Label>
        <Input
          id="productInterest"
          placeholder={copy.placeholders.productInterest}
          aria-invalid={Boolean(errors.productInterest)}
          {...register("productInterest", { required: copy.required.productInterest })}
        />
        {errors.productInterest ? (
          <p className="text-sm text-destructive">{errors.productInterest.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">{copy.labels.message}</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder={copy.placeholders.message}
          aria-invalid={Boolean(errors.message)}
          {...register("message", { required: copy.required.message })}
        />
        {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="h-11">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        {copy.submit}
      </Button>
    </form>
  );
}
