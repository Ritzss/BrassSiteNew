"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import {
  FiEdit2,
  FiExternalLink,
  FiPlay,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

interface Video {
  _id: string;
  title: string;
  videoUrl: string;
  thumbnail?: string;
  active: boolean;
  createdAt: string;
}

interface VideoForm {
  title: string;
  videoUrl: string;
  thumbnail: string;
  active: boolean;
}

const emptyForm: VideoForm = {
  title: "",
  videoUrl: "",
  thumbnail: "",
  active: true,
};

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingId, setEditingId] = useState<
    string | null
  >(null);

  const [form, setForm] =
    useState<VideoForm>(emptyForm);

  /**
   * Fetch videos from MongoDB.
   */
  const fetchVideos = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        "/api/admin/videos",
      );

      setVideos(res.data.videos || []);
    } catch (error) {
      console.error(
        "Failed to fetch videos:",
        error,
      );

      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  /**
   * Filter videos by title or URL.
   */
  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return videos;

    return videos.filter(
      (video) =>
        video.title
          .toLowerCase()
          .includes(query) ||
        video.videoUrl
          .toLowerCase()
          .includes(query),
    );
  }, [videos, search]);

  const activeCount = videos.filter(
    (video) => video.active,
  ).length;

  const inactiveCount =
    videos.length - activeCount;

  const openCreateModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (video: Video) => {
    setEditingId(video._id);

    setForm({
      title: video.title,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail || "",
      active: video.active,
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
   * Create or update a video.
   */
  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Video title is required");
      return;
    }

    if (!form.videoUrl.trim()) {
      toast.error("Video URL is required");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const res = await axios.patch(
          `/api/admin/videos/${editingId}`,
          form,
        );

        setVideos((current) =>
          current.map((video) =>
            video._id === editingId
              ? res.data.video
              : video,
          ),
        );

        toast.success("Video updated");
      } else {
        const res = await axios.post(
          "/api/admin/videos",
          form,
        );

        setVideos((current) => [
          res.data.video,
          ...current,
        ]);

        toast.success("Video added");
      }

      closeModal();
    } catch (error) {
      console.error(
        "Failed to save video:",
        error,
      );

      toast.error("Failed to save video");
    } finally {
      setSaving(false);
    }
  };

  /**
   * Toggle active/inactive state.
   */
  const toggleActive = async (video: Video) => {
    try {
      const res = await axios.patch(
        `/api/admin/videos/${video._id}`,
        {
          active: !video.active,
        },
      );

      setVideos((current) =>
        current.map((item) =>
          item._id === video._id
            ? res.data.video
            : item,
        ),
      );

      toast.success(
        video.active
          ? "Video hidden"
          : "Video activated",
      );
    } catch (error) {
      console.error(
        "Failed to update video status:",
        error,
      );

      toast.error(
        "Failed to update video status",
      );
    }
  };

  /**
   * Delete a video permanently.
   */
  const handleDelete = async (video: Video) => {
    const confirmed = window.confirm(
      `Delete "${video.title}"?`,
    );

    if (!confirmed) return;

    try {
      await axios.delete(
        `/api/admin/videos/${video._id}`,
      );

      setVideos((current) =>
        current.filter(
          (item) => item._id !== video._id,
        ),
      );

      toast.success("Video deleted");
    } catch (error) {
      console.error(
        "Failed to delete video:",
        error,
      );

      toast.error("Failed to delete video");
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
                Media Library
              </p>

              <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Videos
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#F4F2DD]/70 sm:text-base">
                Manage product videos, brand stories,
                and visual content shown across the
                storefront.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E4E198] px-5 py-3 text-sm font-bold text-[#0E4001] transition hover:scale-[1.02] hover:bg-white"
            >
              <FiPlus />
              Add Video
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total Videos"
            value={videos.length}
          />

          <StatCard
            label="Active"
            value={activeCount}
          />

          <StatCard
            label="Hidden"
            value={inactiveCount}
          />
        </section>

        {/* Toolbar */}
        <section className="flex flex-col gap-4 rounded-[22px] border border-[#889551]/25 bg-white/55 p-4 shadow-sm backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#889551]">
              Video Library
            </p>

            <p className="mt-1 text-sm text-[#0E4001]/60">
              {filteredVideos.length} video
              {filteredVideos.length === 1
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
              placeholder="Search videos..."
              className="w-full rounded-full border border-[#889551]/25 bg-[#F4F2DD] py-3 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#0E4001]/40 focus:border-[#0E4001]"
            />
          </div>
        </section>

        {/* Video grid */}
        {loading ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="aspect-video animate-pulse rounded-[26px] bg-[#889551]/15"
                />
              ),
            )}
          </div>
        ) : filteredVideos.length === 0 ? (
          <EmptyState
            search={search}
            onAdd={openCreateModal}
          />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredVideos.map((video) => (
              <VideoCard
                key={video._id}
                video={video}
                onEdit={openEditModal}
                onDelete={handleDelete}
                onToggle={toggleActive}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0E4001]/60 p-4 backdrop-blur-md">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[30px] border border-[#E4E198]/30 bg-[#F4F2DD] p-6 shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:p-8">

            <div className="mb-7 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#889551]">
                  {editingId
                    ? "Edit Video"
                    : "New Video"}
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#0E4001]">
                  {editingId
                    ? "Update video"
                    : "Add a video"}
                </h2>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-full border border-[#889551]/25 p-3 transition hover:bg-[#E4E198]/40 disabled:opacity-50"
              >
                <FiX />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <FormField label="Video Title *">
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      title: event.target.value,
                    })
                  }
                  placeholder="e.g. The Art of Brass"
                  className={inputClass}
                  required
                />
              </FormField>

              <FormField label="Video URL *">
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      videoUrl:
                        event.target.value,
                    })
                  }
                  placeholder="https://www.youtube.com/watch?v=..."
                  className={inputClass}
                  required
                />
              </FormField>

              <FormField label="Thumbnail URL">
                <input
                  type="url"
                  value={form.thumbnail}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      thumbnail:
                        event.target.value,
                    })
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </FormField>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#889551]/20 bg-white/45 p-4">
                <div>
                  <p className="font-semibold">
                    Active video
                  </p>

                  <p className="mt-1 text-xs text-[#0E4001]/55">
                    Active videos can be displayed on
                    the storefront.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      active:
                        event.target.checked,
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
                  className="rounded-full border border-[#889551]/30 px-6 py-3 text-sm font-semibold transition hover:bg-[#E4E198]/30"
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
                      : "Create Video"}
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
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-[22px] border border-[#889551]/20 bg-white/60 p-5 shadow-sm backdrop-blur-xl">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#889551]">
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl font-semibold text-[#0E4001]">
        {value}
      </p>
    </div>
  );
}

function VideoCard({
  video,
  onEdit,
  onDelete,
  onToggle,
}: {
  video: Video;
  onEdit: (video: Video) => void;
  onDelete: (video: Video) => void;
  onToggle: (video: Video) => void;
}) {
  return (
    <article className="overflow-hidden rounded-[26px] border border-[#889551]/20 bg-white/60 shadow-[0_15px_50px_rgba(14,64,1,0.06)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(14,64,1,0.12)]">

      {/* Video preview */}
      <div className="relative aspect-video overflow-hidden bg-[#0E4001]">
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <iframe
            src={getEmbedUrl(video.videoUrl)}
            title={video.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}

        {video.thumbnail && (
          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center bg-[#0E4001]/30 transition hover:bg-[#0E4001]/45"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E4E198] text-[#0E4001] shadow-xl">
              <FiPlay className="ml-0.5 fill-current" />
            </span>
          </a>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${
            video.active
              ? "bg-[#F4F2DD] text-[#0E4001]"
              : "bg-[#0E4001]/80 text-[#F4F2DD]"
          }`}
        >
          {video.active ? "Active" : "Hidden"}
        </span>
      </div>

      {/* Details */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-[#0E4001]">
              {video.title}
            </h2>

            <p className="mt-1 truncate text-xs text-[#0E4001]/45">
              {video.videoUrl}
            </p>
          </div>

          <a
            href={video.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-full border border-[#889551]/20 p-2.5 text-[#0E4001] transition hover:bg-[#E4E198]/40"
            aria-label="Open video"
          >
            <FiExternalLink size={15} />
          </a>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-[#889551]/15 pt-4">
          <button
            type="button"
            onClick={() => onToggle(video)}
            className="text-xs font-bold uppercase tracking-[0.12em] text-[#889551] transition hover:text-[#0E4001]"
          >
            {video.active
              ? "Hide"
              : "Activate"}
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onEdit(video)}
              className="rounded-full border border-[#889551]/20 p-2.5 transition hover:bg-[#E4E198]/40"
              aria-label="Edit video"
            >
              <FiEdit2 size={15} />
            </button>

            <button
              type="button"
              onClick={() => onDelete(video)}
              className="rounded-full border border-red-900/10 p-2.5 text-red-900 transition hover:bg-red-900/10"
              aria-label="Delete video"
            >
              <FiTrash2 size={15} />
            </button>
          </div>
        </div>
      </div>
    </article>
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
        <FiPlay />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold">
        {search
          ? "No videos found"
          : "No videos yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#0E4001]/55">
        {search
          ? "Try another search term."
          : "Add your first video to start building your media library."}
      </p>

      {!search && (
        <button
          type="button"
          onClick={onAdd}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0E4001] px-5 py-3 text-sm font-bold text-[#F4F2DD]"
        >
          <FiPlus />
          Add Video
        </button>
      )}
    </div>
  );
}

function getEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);

    if (
      parsed.hostname.includes("youtube.com")
    ) {
      const videoId =
        parsed.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      if (
        parsed.pathname.startsWith("/embed/")
      ) {
        return url;
      }
    }

    if (parsed.hostname === "youtu.be") {
      const videoId =
        parsed.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return url;
  } catch {
    return url;
  }
}

const inputClass =
  "w-full rounded-xl border border-[#889551]/25 bg-white/55 px-4 py-3 text-sm text-[#0E4001] outline-none transition placeholder:text-[#0E4001]/35 focus:border-[#0E4001] focus:ring-2 focus:ring-[#E4E198]/40";