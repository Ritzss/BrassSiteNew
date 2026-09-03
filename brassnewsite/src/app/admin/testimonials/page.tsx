"use client";

import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  FiEdit2,
  FiPlus,
  FiSearch,
  FiStar,
  FiTrash2,
  FiUser,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

interface Testimonial {
  _id: string;
  name: string;
  designation?: string;
  review: string;
  rating: number;
  image?: string;
  active: boolean;
  createdAt: string;
}

interface TestimonialForm {
  name: string;
  designation: string;
  review: string;
  rating: number;
  image: string;
  active: boolean;
}

const emptyForm: TestimonialForm = {
  name: "",
  designation: "",
  review: "",
  rating: 5,
  image: "",
  active: true,
};

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<
    Testimonial[]
  >([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [form, setForm] =
    useState<TestimonialForm>(emptyForm);

  /**
   * Fetch testimonials from MongoDB.
   */
  const fetchTestimonials = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "/api/admin/testimonials",
      );

      setTestimonials(
        res.data.testimonials || [],
      );
    } catch (error) {
      console.error(
        "Failed to fetch testimonials:",
        error,
      );

      toast.error(
        "Failed to load testimonials",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /**
   * Search by customer name, designation,
   * or testimonial content.
   */
  const filteredTestimonials = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return testimonials;
    }

    return testimonials.filter(
      (testimonial) =>
        testimonial.name
          .toLowerCase()
          .includes(query) ||
        testimonial.designation
          ?.toLowerCase()
          .includes(query) ||
        testimonial.review
          .toLowerCase()
          .includes(query),
    );
  }, [search, testimonials]);

  const totalUsers = testimonials.length;

  const activeCount = testimonials.filter(
    (item) => item.active,
  ).length;

  const inactiveCount =
    totalUsers - activeCount;

  const averageRating =
    totalUsers > 0
      ? (
          testimonials.reduce(
            (sum, item) => sum + item.rating,
            0,
          ) / totalUsers
        ).toFixed(1)
      : "0.0";

  /**
   * Opens the modal for creating a testimonial.
   */
  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  /**
   * Opens the modal with existing testimonial data.
   */
  const openEditModal = (
    testimonial: Testimonial,
  ) => {
    setEditingId(testimonial._id);

    setForm({
      name: testimonial.name,
      designation:
        testimonial.designation || "",
      review: testimonial.review,
      rating: testimonial.rating,
      image: testimonial.image || "",
      active: testimonial.active,
    });

    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setIsModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  /**
   * Create or update a testimonial.
   */
  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!form.name.trim()) {
      toast.error("Customer name is required");
      return;
    }

    if (!form.review.trim()) {
      toast.error("Review is required");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const res = await axios.patch(
          `/api/admin/testimonials/${editingId}`,
          form,
        );

        setTestimonials((current) =>
          current.map((item) =>
            item._id === editingId
              ? res.data.testimonial
              : item,
          ),
        );

        toast.success(
          "Testimonial updated",
        );
      } else {
        const res = await axios.post(
          "/api/admin/testimonials",
          form,
        );

        setTestimonials((current) => [
          res.data.testimonial,
          ...current,
        ]);

        toast.success(
          "Testimonial added",
        );
      }

      closeModal();
    } catch (error) {
      console.error(
        "Failed to save testimonial:",
        error,
      );

      toast.error(
        "Failed to save testimonial",
      );
    } finally {
      setSaving(false);
    }
  };

  /**
   * Toggle whether a testimonial is visible
   * on the public website.
   */
  const toggleActive = async (
    testimonial: Testimonial,
  ) => {
    try {
      const res = await axios.patch(
        `/api/admin/testimonials/${testimonial._id}`,
        {
          active: !testimonial.active,
        },
      );

      setTestimonials((current) =>
        current.map((item) =>
          item._id === testimonial._id
            ? res.data.testimonial
            : item,
        ),
      );

      toast.success(
        testimonial.active
          ? "Testimonial hidden"
          : "Testimonial activated",
      );
    } catch (error) {
      console.error(
        "Failed to update testimonial status:",
        error,
      );

      toast.error(
        "Failed to update status",
      );
    }
  };

  /**
   * Permanently deletes a testimonial.
   */
  const handleDelete = async (
    testimonial: Testimonial,
  ) => {
    const confirmed = window.confirm(
      `Delete the testimonial from ${testimonial.name}?`,
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `/api/admin/testimonials/${testimonial._id}`,
      );

      setTestimonials((current) =>
        current.filter(
          (item) =>
            item._id !== testimonial._id,
        ),
      );

      toast.success(
        "Testimonial deleted",
      );
    } catch (error) {
      console.error(
        "Failed to delete testimonial:",
        error,
      );

      toast.error(
        "Failed to delete testimonial",
      );
    }
  };

  return (
    <main className="min-h-full bg-[#F4F2DD] px-4 py-6 text-[#0E4001] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-8">

        {/* Header */}
        <section className="rounded-[28px] bg-[#0E4001] p-6 text-[#F4F2DD] shadow-[0_25px_70px_rgba(14,64,1,0.16)] sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E4E198]">
                Social Proof
              </p>

              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Testimonials
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F4F2DD]/70 sm:text-base">
                Manage customer stories, ratings, and
                testimonials displayed across the store.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E4E198] px-5 py-3 text-sm font-bold text-[#0E4001] transition hover:scale-[1.02] hover:bg-white"
            >
              <FiPlus />
              Add Testimonial
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total"
            value={totalUsers}
          />

          <StatCard
            label="Active"
            value={activeCount}
          />

          <StatCard
            label="Inactive"
            value={inactiveCount}
          />

          <StatCard
            label="Average Rating"
            value={averageRating}
            suffix="★"
          />
        </section>

        {/* Toolbar */}
        <section className="flex flex-col gap-4 rounded-[22px] border border-[#889551]/25 bg-white/55 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#889551]">
              Customer Feedback
            </p>

            <p className="mt-1 text-sm text-[#0E4001]/60">
              {filteredTestimonials.length}{" "}
              testimonial
              {filteredTestimonials.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          <div className="relative w-full sm:max-w-[320px]">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-[#889551]" />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search testimonials..."
              className="w-full rounded-full border border-[#889551]/25 bg-[#F4F2DD] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#0E4001]/40 focus:border-[#0E4001]"
            />
          </div>
        </section>

        {/* Testimonials */}
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-[260px] animate-pulse rounded-[26px] bg-[#889551]/15"
                />
              ),
            )}
          </div>
        ) : filteredTestimonials.length === 0 ? (
          <EmptyState
            search={search}
            onAdd={openCreateModal}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredTestimonials.map(
              (testimonial) => (
                <TestimonialCard
                  key={testimonial._id}
                  testimonial={testimonial}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                  onToggle={toggleActive}
                />
              ),
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E4001]/60 p-4 backdrop-blur-md">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[30px] border border-[#E4E198]/30 bg-[#F4F2DD] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-8">

            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#889551]">
                  {editingId
                    ? "Edit Testimonial"
                    : "New Testimonial"}
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0E4001]">
                  {editingId
                    ? "Update customer story"
                    : "Add customer story"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-full border border-[#889551]/25 p-3 text-[#0E4001] transition hover:bg-[#E4E198]/40 disabled:opacity-50"
              >
                <FiX />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Customer Name *">
                  <input
                    value={form.name}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        name: event.target.value,
                      })
                    }
                    placeholder="e.g. Ritanshu"
                    className={inputClass}
                    required
                  />
                </FormField>

                <FormField label="Designation">
                  <input
                    value={form.designation}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        designation:
                          event.target.value,
                      })
                    }
                    placeholder="e.g. Founder"
                    className={inputClass}
                  />
                </FormField>
              </div>

              <FormField label="Review *">
                <textarea
                  value={form.review}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      review: event.target.value,
                    })
                  }
                  placeholder="Write the customer's testimonial..."
                  rows={5}
                  className={`${inputClass} resize-none rounded-2xl`}
                  required
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Rating">
                  <select
                    value={form.rating}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        rating: Number(
                          event.target.value,
                        ),
                      })
                    }
                    className={inputClass}
                  >
                    {[5, 4, 3, 2, 1].map(
                      (rating) => (
                        <option
                          key={rating}
                          value={rating}
                        >
                          {rating} Stars
                        </option>
                      ),
                    )}
                  </select>
                </FormField>

                <FormField label="Image URL">
                  <input
                    value={form.image}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        image: event.target.value,
                      })
                    }
                    placeholder="/Assets/testimonials/user.jpg"
                    className={inputClass}
                  />
                </FormField>
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#889551]/20 bg-white/45 p-4">
                <div>
                  <p className="font-semibold">
                    Active testimonial
                  </p>

                  <p className="mt-1 text-xs text-[#0E4001]/55">
                    Active testimonials can be shown
                    on the storefront.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      active: event.target.checked,
                    })
                  }
                  className="h-5 w-5 accent-[#0E4001]"
                />
              </label>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-full border border-[#889551]/30 px-6 py-3 text-sm font-semibold text-[#0E4001] transition hover:bg-[#E4E198]/30"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-[#0E4001] px-7 py-3 text-sm font-bold text-[#F4F2DD] transition hover:bg-[#355B2A] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Save Changes"
                      : "Create Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Helper Components                                                           */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  suffix,
}: {
  label: string;
  value: string | number;
  suffix?: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#889551]/20 bg-white/60 p-5 shadow-sm backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl font-semibold text-[#0E4001]">
        {value}
        {suffix && (
          <span className="ml-1 text-xl text-[#889551]">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
}

function TestimonialCard({
  testimonial,
  onEdit,
  onDelete,
  onToggle,
}: {
  testimonial: Testimonial;
  onEdit: (testimonial: Testimonial) => void;
  onDelete: (testimonial: Testimonial) => void;
  onToggle: (testimonial: Testimonial) => void;
}) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-[#889551]/20 bg-white/60 p-6 shadow-[0_15px_50px_rgba(14,64,1,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(14,64,1,0.12)]">

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {testimonial.image ? (
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-[#E4E198]"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0E4001] text-[#E4E198]">
              <FiUser />
            </div>
          )}

          <div className="min-w-0">
            <h3 className="truncate font-semibold text-[#0E4001]">
              {testimonial.name}
            </h3>

            <p className="truncate text-xs text-[#0E4001]/50">
              {testimonial.designation ||
                "Customer"}
            </p>
          </div>
        </div>

        <StatusBadge
          active={testimonial.active}
        />
      </div>

      <div className="mt-5 flex items-center gap-1">
        {Array.from({ length: 5 }).map(
          (_, index) => (
            <FiStar
              key={index}
              className={
                index < testimonial.rating
                  ? "fill-[#E4E198] text-[#889551]"
                  : "text-[#889551]/25"
              }
              size={15}
            />
          ),
        )}

        <span className="ml-2 text-xs font-semibold text-[#0E4001]/50">
          {testimonial.rating}/5
        </span>
      </div>

      <blockquote className="mt-5 min-h-[90px] text-sm leading-7 text-[#0E4001]/75">
        “{testimonial.review}”
      </blockquote>

      <div className="mt-6 flex items-center justify-between border-t border-[#889551]/15 pt-4">
        <button
          type="button"
          onClick={() => onToggle(testimonial)}
          className="text-xs font-bold uppercase tracking-[0.12em] text-[#889551] transition hover:text-[#0E4001]"
        >
          {testimonial.active
            ? "Hide"
            : "Activate"}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(testimonial)}
            className="rounded-full border border-[#889551]/20 p-2.5 text-[#0E4001] transition hover:bg-[#E4E198]/40"
            aria-label="Edit testimonial"
          >
            <FiEdit2 size={15} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(testimonial)}
            className="rounded-full border border-red-900/10 p-2.5 text-red-900 transition hover:bg-red-900/10"
            aria-label="Delete testimonial"
          >
            <FiTrash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
}

function StatusBadge({
  active,
}: {
  active: boolean;
}) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
        active
          ? "bg-[#0E4001]/10 text-[#0E4001]"
          : "bg-[#889551]/15 text-[#889551]"
      }`}
    >
      {active ? "Active" : "Hidden"}
    </span>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-[#889551]">
        {label}
      </span>

      {children}
    </label>
  );
}

function EmptyState({
  search,
  onAdd,
}: {
  search: string;
  onAdd: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#889551]/30 bg-white/40 px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0E4001] text-[#E4E198]">
        <FiStar />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold">
        {search
          ? "No testimonials found"
          : "No testimonials yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#0E4001]/55">
        {search
          ? "Try a different search term."
          : "Add your first customer testimonial to start building social proof."}
      </p>

      {!search && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0E4001] px-5 py-3 text-sm font-bold text-[#F4F2DD]"
        >
          <FiPlus />
          Add Testimonial
        </button>
      )}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-[#889551]/25 bg-white/55 px-4 py-3 text-sm text-[#0E4001] outline-none transition placeholder:text-[#0E4001]/35 focus:border-[#0E4001] focus:ring-2 focus:ring-[#E4E198]/40";