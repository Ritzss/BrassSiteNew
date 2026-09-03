"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  Search,
  Users,
  ShieldCheck,
  UserRound,
  UserX,
  Trash2,
  Ban,
  CheckCircle2,
  RefreshCcw,
  Phone,
  Mail,
  CalendarDays,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "customer" | "admin";
  isBlocked: boolean;
  createdAt?: string;
}

/* =========================================================
   PAGE
========================================================= */

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "customer" | "admin"
  >("all");

  const [actionLoading, setActionLoading] =
    useState<string | null>(null);

  /* =========================================================
     FETCH USERS
  ========================================================= */

  const fetchUsers = async (
    showRefresh = false,
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await axios.get(
        "/api/admin/users",
      );

      setUsers(
        Array.isArray(res.data)
          ? res.data
          : [],
      );
    } catch (error) {
      console.error(
        "Failed to fetch users:",
        error,
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* =========================================================
     FILTER USERS
  ========================================================= */

  const filteredUsers = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name
          ?.toLowerCase()
          .includes(query) ||
        user.email
          ?.toLowerCase()
          .includes(query) ||
        user.phone
          ?.toLowerCase()
          .includes(query);

      const matchesRole =
        roleFilter === "all" ||
        user.role === roleFilter;

      return (
        matchesSearch &&
        matchesRole
      );
    });
  }, [users, search, roleFilter]);

  /* =========================================================
     STATISTICS
  ========================================================= */

  const totalCustomers = users.filter(
    (user) => user.role === "customer",
  ).length;

  const totalAdmins = users.filter(
    (user) => user.role === "admin",
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked,
  ).length;

  /* =========================================================
     BLOCK / UNBLOCK
  ========================================================= */

  const toggleBlock = async (user: User) => {
    try {
      setActionLoading(user._id);

      const res = await axios.patch(
        `/api/admin/users/${user._id}`,
        {
          isBlocked: !user.isBlocked,
        },
      );

      if (res.data?.success) {
        setUsers((currentUsers) =>
          currentUsers.map((currentUser) =>
            currentUser._id === user._id
              ? {
                  ...currentUser,
                  isBlocked:
                    !currentUser.isBlocked,
                }
              : currentUser,
          ),
        );
      }
    } catch (error) {
      console.error(
        "Failed to update user:",
        error,
      );
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
     DELETE USER
  ========================================================= */

  const deleteUser = async (user: User) => {
    const confirmed = window.confirm(
      `Delete ${user.name}? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      setActionLoading(user._id);

      const res = await axios.delete(
        `/api/admin/users/${user._id}`,
      );

      if (res.data?.success) {
        setUsers((currentUsers) =>
          currentUsers.filter(
            (currentUser) =>
              currentUser._id !== user._id,
          ),
        );
      }
    } catch (error) {
      console.error(
        "Failed to delete user:",
        error,
      );
    } finally {
      setActionLoading(null);
    }
  };

  /* =========================================================
     FORMAT DATE
  ========================================================= */

  const formatDate = (
    date?: string,
  ) => {
    if (!date) return "Unknown";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-[#F4F2DD]">
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-12 w-12">
              <div className="absolute inset-0 rounded-full border border-[#889551]/30" />

              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#889551] border-t-transparent" />
            </div>

            <p className="text-[8px] uppercase tracking-[0.25em] text-[#0E4001]/40">
              Loading Users
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F4F2DD] text-[#0E4001]">
      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-10">

        {/* ===================================================
            HEADER
        =================================================== */}

        <section
          className="
            relative
            overflow-hidden
            rounded-[30px]
            bg-[#0E4001]
            px-6
            py-8
            text-[#F4F2DD]
            shadow-[0_25px_70px_rgba(14,64,1,0.15)]
            sm:px-8
            sm:py-10
            lg:px-10
          "
        >
          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-20
              -top-24
              h-64
              w-64
              rounded-full
              border
              border-[#E4E198]/10
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              right-10
              top-10
              h-32
              w-32
              rounded-full
              bg-[#889551]/20
              blur-3xl
            "
          />

          <div className="relative z-10">
            <p className="text-[8px] uppercase tracking-[0.3em] text-[#E4E198]">
              Customer Management
            </p>

            <div className="mt-2 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h1
                  className="
                    font-serif
                    text-4xl
                    italic
                    leading-none
                    sm:text-5xl
                  "
                >
                  Users
                </h1>

                <p className="mt-3 max-w-lg text-[10px] leading-5 text-[#F4F2DD]/50 sm:text-[11px]">
                  Manage customers, administrators
                  and account access.
                </p>
              </div>

              <div
                className="
                  flex
                  w-fit
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#E4E198]/15
                  bg-white/[0.06]
                  px-4
                  py-2.5
                  backdrop-blur-md
                "
              >
                <Users
                  size={13}
                  className="text-[#E4E198]"
                />

                <span className="text-[8px] uppercase tracking-[0.14em] text-[#F4F2DD]/60">
                  {users.length} Total Users
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================
            STATISTICS
        =================================================== */}

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          <StatCard
            label="Total Users"
            value={users.length}
            icon={Users}
          />

          <StatCard
            label="Customers"
            value={totalCustomers}
            icon={UserRound}
          />

          <StatCard
            label="Admins"
            value={totalAdmins}
            icon={ShieldCheck}
          />

          <StatCard
            label="Blocked"
            value={blockedUsers}
            icon={UserX}
            warning={blockedUsers > 0}
          />
        </div>

        {/* ===================================================
            SEARCH + FILTER
        =================================================== */}

        <section
          className="
            mt-6
            rounded-[26px]
            border
            border-[#0E4001]/10
            bg-white/45
            p-4
            shadow-[0_15px_45px_rgba(14,64,1,0.06)]
            backdrop-blur-xl
            sm:p-5
          "
        >
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}

            <div
              className="
                relative
                w-full
                lg:max-w-md
              "
            >
              <Search
                size={16}
                strokeWidth={1.5}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-[#889551]
                "
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search users..."
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-[#0E4001]/10
                  bg-[#F4F2DD]/70
                  pl-11
                  pr-4
                  text-[10px]
                  text-[#0E4001]
                  outline-none
                  transition
                  placeholder:text-[#0E4001]/30
                  focus:border-[#889551]
                "
              />
            </div>

            {/* Filters */}

            <div className="flex gap-2">
              {(
                [
                  ["all", "All"],
                  ["customer", "Customers"],
                  ["admin", "Admins"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setRoleFilter(value)
                  }
                  className={`
                    rounded-full
                    px-4
                    py-2.5
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    transition-all
                    ${
                      roleFilter === value
                        ? "bg-[#0E4001] text-[#F4F2DD]"
                        : "bg-[#0E4001]/[0.05] text-[#0E4001]/50 hover:bg-[#E4E198]"
                    }
                  `}
                >
                  {label}
                </button>
              ))}

              {/* Refresh */}

              <button
                type="button"
                onClick={() =>
                  fetchUsers(true)
                }
                disabled={refreshing}
                aria-label="Refresh users"
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#0E4001]/10
                  bg-[#F4F2DD]
                  text-[#0E4001]
                  transition
                  hover:bg-[#E4E198]
                  disabled:opacity-50
                "
              >
                <RefreshCcw
                  size={14}
                  className={
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                />
              </button>
            </div>
          </div>

          <div className="mt-3 text-[8px] text-[#0E4001]/35">
            Showing{" "}
            <span className="font-medium text-[#0E4001]/60">
              {filteredUsers.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-[#0E4001]/60">
              {users.length}
            </span>{" "}
            users
          </div>
        </section>

        {/* ===================================================
            USERS LIST
        =================================================== */}

        <section className="mt-6">
          {filteredUsers.length > 0 ? (
            <div className="overflow-hidden rounded-[26px] border border-[#0E4001]/10 bg-white/45 shadow-[0_15px_45px_rgba(14,64,1,0.06)] backdrop-blur-xl">

              {/* Desktop header */}

              <div
                className="
                  hidden
                  grid-cols-[2fr_2fr_1fr_1.2fr_1fr]
                  gap-4
                  border-b
                  border-[#0E4001]/10
                  px-6
                  py-4
                  md:grid
                "
              >
                <span className="text-[7px] uppercase tracking-[0.18em] text-[#889551]">
                  User
                </span>

                <span className="text-[7px] uppercase tracking-[0.18em] text-[#889551]">
                  Contact
                </span>

                <span className="text-[7px] uppercase tracking-[0.18em] text-[#889551]">
                  Role
                </span>

                <span className="text-[7px] uppercase tracking-[0.18em] text-[#889551]">
                  Status
                </span>

                <span className="text-right text-[7px] uppercase tracking-[0.18em] text-[#889551]">
                  Actions
                </span>
              </div>

              {/* Users */}

              <div className="divide-y divide-[#0E4001]/[0.07]">
                {filteredUsers.map(
                  (user) => {
                    const isActionLoading =
                      actionLoading ===
                      user._id;

                    const initial =
                      user.name
                        ?.charAt(0)
                        ?.toUpperCase() ||
                      "U";

                    return (
                      <div
                        key={user._id}
                        className="
                          group
                          px-4
                          py-5
                          transition
                          hover:bg-[#E4E198]/20
                          sm:px-6
                        "
                      >
                        {/* ===========================
                            DESKTOP
                        =========================== */}

                        <div className="hidden grid-cols-[2fr_2fr_1fr_1.2fr_1fr] items-center gap-4 md:grid">

                          {/* User */}

                          <div className="flex min-w-0 items-center gap-3">
                            <UserAvatar
                              initial={initial}
                              role={user.role}
                            />

                            <div className="min-w-0">
                              <p className="truncate text-[10px] font-medium text-[#0E4001]">
                                {user.name}
                              </p>

                              <p className="mt-1 flex items-center gap-1 text-[8px] text-[#0E4001]/35">
                                <CalendarDays
                                  size={9}
                                />

                                Joined{" "}
                                {formatDate(
                                  user.createdAt,
                                )}
                              </p>
                            </div>
                          </div>

                          {/* Contact */}

                          <div className="min-w-0">
                            <p className="flex items-center gap-2 truncate text-[9px] text-[#0E4001]/65">
                              <Mail
                                size={11}
                                className="shrink-0 text-[#889551]"
                              />

                              {user.email}
                            </p>

                            {user.phone && (
                              <p className="mt-1 flex items-center gap-2 text-[8px] text-[#0E4001]/35">
                                <Phone
                                  size={9}
                                />

                                {user.phone}
                              </p>
                            )}
                          </div>

                          {/* Role */}

                          <RoleBadge
                            role={user.role}
                          />

                          {/* Status */}

                          <StatusBadge
                            blocked={
                              user.isBlocked
                            }
                          />

                          {/* Actions */}

                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              disabled={
                                isActionLoading
                              }
                              onClick={() =>
                                toggleBlock(
                                  user,
                                )
                              }
                              title={
                                user.isBlocked
                                  ? "Unblock user"
                                  : "Block user"
                              }
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-[#0E4001]/10
                                bg-[#F4F2DD]
                                text-[#0E4001]
                                transition
                                hover:bg-[#E4E198]
                                disabled:opacity-40
                              "
                            >
                              {user.isBlocked ? (
                                <CheckCircle2
                                  size={14}
                                />
                              ) : (
                                <Ban
                                  size={14}
                                />
                              )}
                            </button>

                            <button
                              type="button"
                              disabled={
                                isActionLoading
                              }
                              onClick={() =>
                                deleteUser(
                                  user,
                                )
                              }
                              title="Delete user"
                              className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-red-900/10
                                bg-red-50
                                text-red-700
                                transition
                                hover:bg-red-100
                                disabled:opacity-40
                              "
                            >
                              <Trash2
                                size={14}
                              />
                            </button>
                          </div>
                        </div>

                        {/* ===========================
                            MOBILE
                        =========================== */}

                        <div className="md:hidden">
                          <div className="flex items-start justify-between gap-3">

                            <div className="flex min-w-0 items-center gap-3">
                              <UserAvatar
                                initial={
                                  initial
                                }
                                role={
                                  user.role
                                }
                              />

                              <div className="min-w-0">
                                <p className="truncate text-[11px] font-medium text-[#0E4001]">
                                  {user.name}
                                </p>

                                <p className="mt-1 truncate text-[8px] text-[#0E4001]/40">
                                  {user.email}
                                </p>
                              </div>
                            </div>

                            <RoleBadge
                              role={user.role}
                            />
                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">
                            <StatusBadge
                              blocked={
                                user.isBlocked
                              }
                            />

                            <div className="flex gap-2">
                              <button
                                type="button"
                                disabled={
                                  isActionLoading
                                }
                                onClick={() =>
                                  toggleBlock(
                                    user,
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  items-center
                                  gap-1.5
                                  rounded-xl
                                  border
                                  border-[#0E4001]/10
                                  bg-[#F4F2DD]
                                  px-3
                                  text-[7px]
                                  uppercase
                                  tracking-[0.1em]
                                  text-[#0E4001]
                                "
                              >
                                {user.isBlocked ? (
                                  <>
                                    <CheckCircle2
                                      size={12}
                                    />
                                    Unblock
                                  </>
                                ) : (
                                  <>
                                    <Ban
                                      size={12}
                                    />
                                    Block
                                  </>
                                )}
                              </button>

                              <button
                                type="button"
                                disabled={
                                  isActionLoading
                                }
                                onClick={() =>
                                  deleteUser(
                                    user,
                                  )
                                }
                                className="
                                  flex
                                  h-9
                                  w-9
                                  items-center
                                  justify-center
                                  rounded-xl
                                  bg-red-50
                                  text-red-700
                                "
                              >
                                <Trash2
                                  size={13}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          ) : (
            /* =================================================
               EMPTY STATE
            ================================================= */

            <div
              className="
                flex
                min-h-[320px]
                flex-col
                items-center
                justify-center
                rounded-[26px]
                border
                border-[#0E4001]/10
                bg-white/45
                px-6
                text-center
                shadow-[0_15px_45px_rgba(14,64,1,0.06)]
                backdrop-blur-xl
              "
            >
              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  bg-[#E4E198]/50
                  text-[#889551]
                "
              >
                <Users
                  size={24}
                  strokeWidth={1.3}
                />
              </div>

              <h3 className="mt-5 font-serif text-xl italic text-[#0E4001]">
                No users found
              </h3>

              <p className="mt-2 max-w-sm text-[9px] leading-5 text-[#0E4001]/40">
                Try changing your search or
                role filter.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  label,
  value,
  icon: Icon,
  warning = false,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  warning?: boolean;
}) {
  return (
    <div
      className="
        rounded-[22px]
        border
        border-[#0E4001]/10
        bg-white/50
        p-4
        shadow-[0_12px_35px_rgba(14,64,1,0.06)]
        backdrop-blur-xl
        sm:p-5
      "
    >
      <div className="flex items-center justify-between">
        <span className="text-[7px] uppercase tracking-[0.15em] text-[#0E4001]/40">
          {label}
        </span>

        <Icon
          size={16}
          strokeWidth={1.5}
          className={
            warning
              ? "text-[#9C6B22]"
              : "text-[#889551]"
          }
        />
      </div>

      <p className="mt-4 font-serif text-2xl italic text-[#0E4001] sm:text-3xl">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

/* =========================================================
   USER AVATAR
========================================================= */

function UserAvatar({
  initial,
  role,
}: {
  initial: string;
  role: "customer" | "admin";
}) {
  return (
    <div
      className={`
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-full
        font-serif
        text-sm
        italic
        ${
          role === "admin"
            ? "bg-[#0E4001] text-[#E4E198]"
            : "bg-[#E4E198] text-[#0E4001]"
        }
      `}
    >
      {initial}
    </div>
  );
}

/* =========================================================
   ROLE BADGE
========================================================= */

function RoleBadge({
  role,
}: {
  role: "customer" | "admin";
}) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1.5
        text-[7px]
        uppercase
        tracking-[0.1em]
        ${
          role === "admin"
            ? "bg-[#0E4001]/10 text-[#0E4001]"
            : "bg-[#889551]/10 text-[#889551]"
        }
      `}
    >
      {role === "admin" ? (
        <ShieldCheck size={10} />
      ) : (
        <UserRound size={10} />
      )}

      {role}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  blocked,
}: {
  blocked: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        w-fit
        items-center
        gap-1.5
        rounded-full
        px-2.5
        py-1.5
        text-[7px]
        uppercase
        tracking-[0.1em]
        ${
          blocked
            ? "bg-red-900/10 text-red-700"
            : "bg-[#889551]/10 text-[#889551]"
        }
      `}
    >
      <span
        className={`
          h-1.5
          w-1.5
          rounded-full
          ${
            blocked
              ? "bg-red-600"
              : "bg-[#889551]"
          }
        `}
      />

      {blocked ? "Blocked" : "Active"}
    </span>
  );
}