"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InquiryForm = {
  name: string;
  company: string;
  email: string;
  productInterest: string;
  message: string;
};

export function ContactForm({
  defaultProductInterest = "",
}: {
  defaultProductInterest?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      toast.success(
        webhookUrl
          ? "Inquiry sent to sales workflow."
          : "Inquiry captured in demo mode. Add NEXT_PUBLIC_N8N_WEBHOOK_URL to enable n8n."
      );
      reset();
    } catch {
      toast.error("Inquiry could not be sent. Please email sales@nusantaraharvest.example.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={Boolean(errors.name)}
          {...register("name", { required: "Name is required" })}
        />
        {errors.name ? <p className="text-sm text-destructive">{errors.name.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          autoComplete="organization"
          aria-invalid={Boolean(errors.company)}
          {...register("company", { required: "Company is required" })}
        />
        {errors.company ? <p className="text-sm text-destructive">{errors.company.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={Boolean(errors.email)}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email ? <p className="text-sm text-destructive">{errors.email.message}</p> : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="productInterest">Product Interest</Label>
        <Input
          id="productInterest"
          placeholder="Dried eucheuma seaweed, cocoa beans, coconut..."
          aria-invalid={Boolean(errors.productInterest)}
          {...register("productInterest", { required: "Product interest is required" })}
        />
        {errors.productInterest ? (
          <p className="text-sm text-destructive">{errors.productInterest.message}</p>
        ) : null}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          placeholder="Target quantity, destination port, specification, and shipment timeline"
          aria-invalid={Boolean(errors.message)}
          {...register("message", { required: "Message is required" })}
        />
        {errors.message ? <p className="text-sm text-destructive">{errors.message.message}</p> : null}
      </div>
      <Button type="submit" size="lg" disabled={isSubmitting} className="h-11">
        {isSubmitting ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : <Send className="size-4" aria-hidden="true" />}
        Send Inquiry
      </Button>
    </form>
  );
}
