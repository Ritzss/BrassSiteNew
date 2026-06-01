"use client";

import { useState } from "react";

export default function SettingsPage() {

  const [storeName, setStoreName] =
    useState("Brass Site");

  const [email, setEmail] =
    useState("support@brasssite.com");

  const [phone, setPhone] =
    useState("+91 9999999999");

  const [instagram, setInstagram] =
    useState("@brasssite");

  const saveSettings = () => {

    alert(
      "Settings Saved"
    );
  };

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold text-[#889551] dark:text-[#f4f2dd]">
          Settings
        </h1>

        <p className="mt-2 text-[#889551]/80 dark:text-[#f4f2dd]/80">
          Configure your store settings.
        </p>

      </div>

      <div className="bg-[#e4e198] dark:bg-[#5f6b35] rounded-2xl p-8 border border-[#889551] flex flex-col gap-6 max-w-3xl">

        <div className="flex flex-col gap-2">

          <label className="font-semibold">
            Store Name
          </label>

          <input
            type="text"
            value={storeName}
            onChange={(e) =>
              setStoreName(
                e.target.value
              )
            }
            className="
              p-4
              rounded-xl
              bg-[#f4f2dd]
              dark:bg-[#889551]
              outline-none
            "
          />

        </div>

        <div className="flex flex-col gap-2">

          <label className="font-semibold">
            Support Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              p-4
              rounded-xl
              bg-[#f4f2dd]
              dark:bg-[#889551]
              outline-none
            "
          />

        </div>

        <div className="flex flex-col gap-2">

          <label className="font-semibold">
            Contact Number
          </label>

          <input
            type="text"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            className="
              p-4
              rounded-xl
              bg-[#f4f2dd]
              dark:bg-[#889551]
              outline-none
            "
          />

        </div>

        <div className="flex flex-col gap-2">

          <label className="font-semibold">
            Instagram
          </label>

          <input
            type="text"
            value={instagram}
            onChange={(e) =>
              setInstagram(
                e.target.value
              )
            }
            className="
              p-4
              rounded-xl
              bg-[#f4f2dd]
              dark:bg-[#889551]
              outline-none
            "
          />

        </div>

        <button
          onClick={saveSettings}
          className="
            bg-[#889551]
            text-[#f4f2dd]
            p-4
            rounded-xl
            font-semibold
            hover:opacity-90
            transition
          "
        >
          Save Settings
        </button>

      </div>

    </div>
  );
}