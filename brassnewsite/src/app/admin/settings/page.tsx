"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiCheck,
  FiGlobe,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiPhone,
  FiSave,
  FiTruck,
  FiYoutube,
} from "react-icons/fi";
import { toast } from "sonner";

interface Settings {
  _id?: string;
  siteName: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  instagram: string;
  facebook: string;
  youtube: string;
  shippingFee: number;
  freeShippingAbove: number;
}

const defaultSettings: Settings = {
  siteName: "",
  email: "",
  phone: "",
  whatsapp: "",
  address: "",
  instagram: "",
  facebook: "",
  youtube: "",
  shippingFee: 0,
  freeShippingAbove: 0,
};

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<Settings>(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  /**
   * Fetch current settings when the page loads.
   */
  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "/api/admin/settings",
      );

      setSettings({
        ...defaultSettings,
        ...res.data.settings,
      });
    } catch (error) {
      console.error(
        "Failed to fetch settings:",
        error,
      );

      toast.error(
        "Failed to load settings",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  /**
   * Generic field updater keeps all form inputs
   * connected to the same settings object.
   */
  const updateField = <
    K extends keyof Settings,
  >(
    field: K,
    value: Settings[K],
  ) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /**
   * Persist settings to MongoDB.
   */
  const saveSettings = async () => {
    if (!settings.siteName.trim()) {
      toast.error("Store name is required");
      return;
    }

    if (
      settings.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        settings.email,
      )
    ) {
      toast.error(
        "Enter a valid support email",
      );
      return;
    }

    try {
      setSaving(true);

      const res = await axios.patch(
        "/api/admin/settings",
        settings,
      );

      setSettings({
        ...defaultSettings,
        ...res.data.settings,
      });

      toast.success(
        "Settings saved successfully",
      );
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error,
      );

      toast.error(
        "Failed to save settings",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <SettingsSkeleton />;
  }

  return (
    <main className="min-h-full bg-[#F4F2DD] px-4 py-6 text-[#0E4001] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] space-y-8">

        {/* Header */}
        <section className="rounded-[28px] bg-[#0E4001] p-6 text-[#F4F2DD] shadow-[0_25px_70px_rgba(14,64,1,0.16)] sm:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#E4E198]">
            Store Configuration
          </p>

          <h1 className="font-serif text-4xl font-semibold sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F4F2DD]/70 sm:text-base">
            Manage your store identity, contact
            information, social channels, and shipping
            configuration.
          </p>
        </section>

        {/* Store identity */}
        <SettingsSection
          icon={<FiGlobe />}
          eyebrow="Identity"
          title="Store Information"
          description="Basic information used throughout the storefront."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <InputField
              label="Store Name"
              value={settings.siteName}
              onChange={(value) =>
                updateField(
                  "siteName",
                  value,
                )
              }
              placeholder="Your store name"
            />

            <InputField
              label="Support Email"
              type="email"
              value={settings.email}
              onChange={(value) =>
                updateField(
                  "email",
                  value,
                )
              }
              placeholder="support@example.com"
              icon={<FiMail />}
            />

            <InputField
              label="Contact Number"
              value={settings.phone}
              onChange={(value) =>
                updateField(
                  "phone",
                  value,
                )
              }
              placeholder="+91..."
              icon={<FiPhone />}
            />

            <InputField
              label="WhatsApp"
              value={settings.whatsapp}
              onChange={(value) =>
                updateField(
                  "whatsapp",
                  value,
                )
              }
              placeholder="+91..."
              icon={<FiMessageCircle />}
            />
          </div>

          <div className="mt-5">
            <TextAreaField
              label="Store Address"
              value={settings.address}
              onChange={(value) =>
                updateField(
                  "address",
                  value,
                )
              }
              placeholder="Your business address"
              icon={<FiMapPin />}
            />
          </div>
        </SettingsSection>

        {/* Social media */}
        <SettingsSection
          icon={<FiInstagram />}
          eyebrow="Social Presence"
          title="Social Channels"
          description="Keep your storefront social links in one place."
        >
          <div className="grid gap-5 sm:grid-cols-3">
            <InputField
              label="Instagram"
              value={settings.instagram}
              onChange={(value) =>
                updateField(
                  "instagram",
                  value,
                )
              }
              placeholder="@yourbrand"
            />

            <InputField
              label="Facebook"
              value={settings.facebook}
              onChange={(value) =>
                updateField(
                  "facebook",
                  value,
                )
              }
              placeholder="Facebook URL"
            />

            <InputField
              label="YouTube"
              value={settings.youtube}
              onChange={(value) =>
                updateField(
                  "youtube",
                  value,
                )
              }
              placeholder="YouTube URL"
              icon={<FiYoutube />}
            />
          </div>
        </SettingsSection>

        {/* Shipping */}
        <SettingsSection
          icon={<FiTruck />}
          eyebrow="Commerce"
          title="Shipping"
          description="Configure your store's shipping charges."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <NumberField
              label="Shipping Fee"
              value={settings.shippingFee}
              onChange={(value) =>
                updateField(
                  "shippingFee",
                  value,
                )
              }
              prefix="₹"
            />

            <NumberField
              label="Free Shipping Above"
              value={
                settings.freeShippingAbove
              }
              onChange={(value) =>
                updateField(
                  "freeShippingAbove",
                  value,
                )
              }
              prefix="₹"
            />
          </div>

          <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#889551]/20 bg-[#E4E198]/20 p-4">
            <FiTruck className="mt-0.5 shrink-0 text-[#889551]" />

            <p className="text-sm leading-6 text-[#0E4001]/65">
              Orders above{" "}
              <strong className="text-[#0E4001]">
                ₹
                {settings.freeShippingAbove ||
                  0}
              </strong>{" "}
              can qualify for free shipping when your
              checkout logic uses this setting.
            </p>
          </div>
        </SettingsSection>

        {/* Save */}
        <div className="sticky bottom-4 z-30 flex justify-end">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-[#0E4001] px-7 py-3.5 text-sm font-bold text-[#F4F2DD] shadow-[0_15px_40px_rgba(14,64,1,0.22)] transition hover:bg-[#355B2A] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <FiCheck />
                Saving...
              </>
            ) : (
              <>
                <FiSave />
                Save Settings
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Section                                                                     */
/* -------------------------------------------------------------------------- */

function SettingsSection({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-sm backdrop-blur-xl sm:p-8">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0E4001] text-[#E4E198]">
          {icon}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-serif text-2xl font-semibold">
            {title}
          </h2>

          <p className="mt-1 text-sm text-[#0E4001]/50">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-7">
        {children}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/* Input fields                                                                */
/* -------------------------------------------------------------------------- */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#889551]">
        {label}
      </span>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#889551]">
            {icon}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={`${inputClass} ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#889551]">
        {label}
      </span>

      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-[#889551]">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          value={value}
          onChange={(event) =>
            onChange(
              Number(event.target.value),
            )
          }
          className={`${inputClass} ${
            prefix ? "pl-10" : ""
          }`}
        />
      </div>
    </label>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#889551]">
        {label}
      </span>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-4 text-[#889551]">
            {icon}
          </span>
        )}

        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={4}
          className={`${inputClass} resize-none rounded-2xl ${
            icon ? "pl-11" : ""
          }`}
        />
      </div>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Loading                                                                     */
/* -------------------------------------------------------------------------- */

function SettingsSkeleton() {
  return (
    <main className="min-h-full bg-[#F4F2DD] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1200px] space-y-8">
        <div className="h-[190px] animate-pulse rounded-[28px] bg-[#0E4001]/10" />

        {Array.from({ length: 3 }).map(
          (_, index) => (
            <div
              key={index}
              className="h-[280px] animate-pulse rounded-[26px] bg-[#889551]/15"
            />
          ),
        )}
      </div>
    </main>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#889551]/25 bg-[#F4F2DD]/80 px-4 py-3.5 text-sm text-[#0E4001] outline-none transition placeholder:text-[#0E4001]/35 focus:border-[#0E4001] focus:ring-2 focus:ring-[#E4E198]/40";