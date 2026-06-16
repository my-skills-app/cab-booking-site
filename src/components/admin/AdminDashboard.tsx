"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Phone,
  IndianRupee,
  Users,
  Video,
  Star,
  ClipboardList,
  LogOut,
  ExternalLink,
  Download,
  Save,
  Trash2,
  Plus,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { YouTubeUrlInput } from "@/components/admin/YouTubeUrlInput";
import { toYouTubeEmbedUrl } from "@/lib/youtube";
import type {
  BookingSubmission,
  CustomerReview,
  PopularFare,
  PricingFare,
  SiteSettings,
  TeamMember,
  TestimonialVideo,
} from "@/lib/types";

async function api<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Request failed");
  }
  return res.json();
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function ActionButtons({
  onSave,
  onDelete,
  saveLabel = "Save",
}: {
  onSave: () => void | Promise<void>;
  onDelete: () => void | Promise<void>;
  saveLabel?: string;
}) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave();
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete();
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto pt-2">
      <Button onClick={handleSave} className="w-full sm:w-auto gap-2" size="sm" disabled={saving || deleting}>
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? "Saving…" : saveLabel}
      </Button>
      <Button onClick={handleDelete} variant="destructive" className="w-full sm:w-auto gap-2" size="sm" disabled={saving || deleting}>
        {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
        {deleting ? "Deleting…" : "Delete"}
      </Button>
    </div>
  );
}

function ItemCard({ title, badge, children }: { title: string; badge?: string; children: React.ReactNode }) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base sm:text-lg leading-snug">{title}</CardTitle>
          {badge && <Badge variant="secondary" className="shrink-0 text-xs">{badge}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">{children}</CardContent>
    </Card>
  );
}

export function AdminDashboard() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [pricingFares, setPricingFares] = useState<PricingFare[]>([]);
  const [popularFares, setPopularFares] = useState<PopularFare[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [videos, setVideos] = useState<TestimonialVideo[]>([]);
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [bookings, setBookings] = useState<BookingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [importing, setImporting] = useState(false);
  const [deletingBookingId, setDeletingBookingId] = useState<string | null>(null);

  const loadAll = async (silent = false) => {
    if (!silent) setLoading(true);
    else setRefreshing(true);
    try {
      const [s, p, pf, t, v, r, b] = await Promise.all([
        api<SiteSettings>("/api/admin/settings"),
        api<PricingFare[]>("/api/admin/pricing-fares"),
        api<PopularFare[]>("/api/admin/popular-fares"),
        api<TeamMember[]>("/api/admin/team-members"),
        api<TestimonialVideo[]>("/api/admin/testimonial-videos"),
        api<CustomerReview[]>("/api/admin/reviews"),
        api<BookingSubmission[]>("/api/admin/bookings"),
      ]);
      setSettings(s);
      setPricingFares(p);
      setPopularFares(pf);
      setTeamMembers(t);
      setVideos(v);
      setReviews(r);
      setBookings(b);
    } catch (e) {
      toast({ title: "Error", description: (e as Error).message, variant: "destructive" });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const saveSettings = async () => {
    if (!settings) return;
    setSavingSettings(true);
    try {
      await api("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      toast({ title: "Settings saved" });
    } catch (e) {
      toast({ title: "Save failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setSavingSettings(false);
    }
  };

  const logout = async () => {
    await api("/api/admin/logout", { method: "POST" });
    window.location.reload();
  };

  const importStaticData = async () => {
    setImporting(true);
    try {
      const res = await api<{ message: string }>("/api/admin/seed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ force: true }),
      });
      toast({ title: "Imported", description: res.message });
      loadAll(true);
    } catch (e) {
      toast({ title: "Import failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setImporting(false);
    }
  };

  const stats = [
    { label: "Pricing", value: pricingFares.length, icon: IndianRupee, color: "bg-blue-50 text-blue-700" },
    { label: "Popular", value: popularFares.length, icon: IndianRupee, color: "bg-emerald-50 text-emerald-700" },
    { label: "Team", value: teamMembers.length, icon: Users, color: "bg-violet-50 text-violet-700" },
    { label: "Videos", value: videos.length, icon: Video, color: "bg-orange-50 text-orange-700" },
    { label: "Reviews", value: reviews.length, icon: Star, color: "bg-amber-50 text-amber-700" },
    { label: "Bookings", value: bookings.length, icon: ClipboardList, color: "bg-rose-50 text-rose-700" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight truncate">IndiasCab Admin</h1>
                <p className="text-xs sm:text-sm text-muted-foreground">Manage content & bookings</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 text-muted-foreground"
                onClick={() => loadAll(true)}
                disabled={refreshing}
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <Button variant="secondary" size="sm" onClick={importStaticData} disabled={importing} className="gap-1.5 text-xs sm:text-sm">
                {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                <span className="truncate">{importing ? "Importing…" : "Import Data"}</span>
              </Button>
              <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs sm:text-sm">
                <a href="/" target="_blank">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View Site
                </a>
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="gap-1.5 text-xs sm:text-sm col-span-2 sm:col-span-1">
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {stats.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-border/60 p-3 sm:p-4 shadow-sm">
              <div className={`w-8 h-8 rounded-lg ${s.color} flex items-center justify-center mb-2`}>
                <s.icon className="w-4 h-4" />
              </div>
              <p className="text-lg sm:text-2xl font-bold">{s.value}</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="settings" className="space-y-4">
          {/* Scrollable tabs for mobile */}
          <div className="sticky top-[calc(var(--admin-header)+0px)] z-10 -mx-4 px-4 sm:mx-0 sm:px-0 bg-gradient-to-b from-slate-50/95 to-transparent pb-2">
            <TabsList className="w-full h-auto flex overflow-x-auto flex-nowrap justify-start gap-1 p-1 bg-white border shadow-sm rounded-xl scrollbar-none [&::-webkit-scrollbar]:hidden">
              <TabsTrigger value="settings" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <Phone className="w-3.5 h-3.5" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="pricing" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <IndianRupee className="w-3.5 h-3.5" />
                Pricing ({pricingFares.length})
              </TabsTrigger>
              <TabsTrigger value="popular" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                Popular ({popularFares.length})
              </TabsTrigger>
              <TabsTrigger value="team" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <Users className="w-3.5 h-3.5" />
                Team ({teamMembers.length})
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <Video className="w-3.5 h-3.5" />
                Videos ({videos.length})
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <Star className="w-3.5 h-3.5" />
                Reviews ({reviews.length})
              </TabsTrigger>
              <TabsTrigger value="bookings" className="text-xs sm:text-sm whitespace-nowrap shrink-0 gap-1.5 px-3 py-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg">
                <ClipboardList className="w-3.5 h-3.5" />
                Bookings ({bookings.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="settings" className="mt-0">
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Site Settings</CardTitle>
                <CardDescription>Phone number & email used across the website</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-4 max-w-lg">
                {settings && (
                  <>
                    <Field label="Phone Number (Hero / WhatsApp / Call)">
                      <Input
                        value={settings.phoneNumber}
                        onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                        className="h-11"
                      />
                    </Field>
                    <Field label="Contact Email">
                      <Input
                        value={settings.contactEmail}
                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                        className="h-11"
                      />
                    </Field>
                    <Button onClick={saveSettings} disabled={savingSettings} className="w-full sm:w-auto gap-2 h-11">
                      {savingSettings ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {savingSettings ? "Saving…" : "Save Settings"}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="mt-0 space-y-4">
            <PricingFaresTab items={pricingFares} onRefresh={() => loadAll(true)} />
          </TabsContent>

          <TabsContent value="popular" className="mt-0 space-y-4">
            <PopularFaresTab items={popularFares} onRefresh={() => loadAll(true)} />
          </TabsContent>

          <TabsContent value="team" className="mt-0 space-y-4">
            <TeamTab items={teamMembers} onRefresh={() => loadAll(true)} />
          </TabsContent>

          <TabsContent value="videos" className="mt-0 space-y-4">
            <VideosTab items={videos} onRefresh={() => loadAll(true)} />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0 space-y-4">
            <ReviewsTab items={reviews} onRefresh={() => loadAll(true)} />
          </TabsContent>

          <TabsContent value="bookings" className="mt-0">
            <Card className="border-border/60 shadow-sm">
              <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Booking Submissions</CardTitle>
                <CardDescription>{bookings.length} total requests</CardDescription>
              </CardHeader>
              <CardContent className="px-4 sm:px-6 space-y-3">
                {bookings.length === 0 && (
                  <p className="text-muted-foreground text-sm text-center py-8">No bookings yet.</p>
                )}
                {bookings.map((b) => (
                  <div key={b._id} className="border rounded-xl p-4 bg-white shadow-sm space-y-2">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div>
                        <p className="font-semibold text-base">{b.name}</p>
                        <a href={`tel:${b.phone}`} className="text-sm text-blue-600 font-medium">{b.phone}</a>
                      </div>
                      <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md shrink-0">
                        {b.createdAt ? new Date(b.createdAt).toLocaleString("en-IN") : ""}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{b.bookingType}</Badge>
                      <Badge variant="outline">{b.vehicleType}</Badge>
                    </div>
                    <p className="text-sm">
                      <span className="text-muted-foreground">Route:</span> {b.pickup} → {b.drop}
                    </p>
                    <p className="text-sm text-muted-foreground">{b.date} at {b.time}</p>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="w-full sm:w-auto gap-2 mt-1"
                      disabled={deletingBookingId === b._id}
                      onClick={async () => {
                        if (!b._id) return;
                        setDeletingBookingId(b._id);
                        try {
                          await api(`/api/admin/bookings/${b._id}`, { method: "DELETE" });
                          toast({ title: "Booking deleted" });
                          loadAll(true);
                        } catch (e) {
                          toast({ title: "Delete failed", description: (e as Error).message, variant: "destructive" });
                        } finally {
                          setDeletingBookingId(null);
                        }
                      }}
                    >
                      {deletingBookingId === b._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      {deletingBookingId === b._id ? "Deleting…" : "Delete"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function PricingFaresTab({ items, onRefresh }: { items: PricingFare[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const empty = { title: "", description: "", price: "", originalPrice: "", discount: "", dealText: "", image: "", alt: "", hint: "" };
  const [form, setForm] = useState(empty);
  const [adding, setAdding] = useState(false);

  const save = async () => {
    setAdding(true);
    try {
      await api("/api/admin/pricing-fares", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      setForm(empty);
      toast({ title: "Pricing fare added" });
      onRefresh();
    } catch (e) {
      toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Card className="border-border/60 shadow-sm border-dashed">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Pricing Fare
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 grid sm:grid-cols-2 gap-3">
          <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10" /></Field>
          <Field label="Price"><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-10" /></Field>
          <Field label="Original Price"><Input value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="h-10" /></Field>
          <Field label="Discount"><Input value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="h-10" /></Field>
          <Field label="Deal Text"><Input value={form.dealText} onChange={(e) => setForm({ ...form, dealText: e.target.value })} className="h-10" /></Field>
          <Field label="Alt Text"><Input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="h-10" /></Field>
          <Field label="Hint"><Input value={form.hint} onChange={(e) => setForm({ ...form, hint: e.target.value })} className="h-10" /></Field>
          <Field label="Image" className="sm:col-span-2">
            <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[80px]" />
          </Field>
          <Button onClick={save} disabled={adding} className="sm:col-span-2 w-full sm:w-auto gap-2">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? "Adding…" : "Add Fare"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {items.map((item) => <EditablePricingCard key={item._id} item={item} onRefresh={onRefresh} />)}
      </div>
    </>
  );
}

function EditablePricingCard({ item, onRefresh }: { item: PricingFare; onRefresh: () => void }) {
  const [form, setForm] = useState(item);
  const { toast } = useToast();
  return (
    <ItemCard title={item.title} badge={item.price}>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10" /></Field>
        <Field label="Price"><Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="h-10" /></Field>
        <Field label="Original Price"><Input value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} className="h-10" /></Field>
        <Field label="Discount"><Input value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} className="h-10" /></Field>
        <Field label="Deal Text"><Input value={form.dealText} onChange={(e) => setForm({ ...form, dealText: e.target.value })} className="h-10" /></Field>
        <Field label="Image" className="sm:col-span-2">
          <ImageUpload value={form.image} onChange={(url) => setForm({ ...form, image: url })} />
        </Field>
        <Field label="Description" className="sm:col-span-2">
          <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="min-h-[80px]" />
        </Field>
        <ActionButtons
          onSave={async () => {
            await api(`/api/admin/pricing-fares/${item._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
            toast({ title: "Updated" });
            onRefresh();
          }}
          onDelete={async () => {
            await api(`/api/admin/pricing-fares/${item._id}`, { method: "DELETE" });
            onRefresh();
          }}
        />
      </div>
    </ItemCard>
  );
}

function EditableTeamCard({ item, onRefresh }: { item: TeamMember; onRefresh: () => void }) {
  const [form, setForm] = useState({ name: item.name, role: item.role, imageUrl: item.imageUrl });
  const { toast } = useToast();

  return (
    <ItemCard title={item.name} badge={item.role}>
      <div className="grid sm:grid-cols-2 gap-3">
        <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10" /></Field>
        <Field label="Role"><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="h-10" /></Field>
        <Field label="Photo" className="sm:col-span-2">
          <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} previewClassName="h-24 w-24 rounded-full" />
        </Field>
      </div>
      <ActionButtons
        onSave={async () => {
          await api(`/api/admin/team-members/${item._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          });
          toast({ title: "Updated" });
          onRefresh();
        }}
        onDelete={async () => {
          await api(`/api/admin/team-members/${item._id}`, { method: "DELETE" });
          onRefresh();
        }}
      />
    </ItemCard>
  );
}

function PopularFaresTab({ items, onRefresh }: { items: PopularFare[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [route, setRoute] = useState("");
  const [price, setPrice] = useState("");
  const [adding, setAdding] = useState(false);

  return (
    <>
      <Card className="border-border/60 shadow-sm border-dashed">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Add Popular Fare (Hero)</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Route"><Input value={route} onChange={(e) => setRoute(e.target.value)} className="h-10" placeholder="Siwan To Patna" /></Field>
            <Field label="Price"><Input value={price} onChange={(e) => setPrice(e.target.value)} className="h-10" placeholder="₹ 2599" /></Field>
          </div>
          <Button
            disabled={adding}
            onClick={async () => {
              setAdding(true);
              try {
                await api("/api/admin/popular-fares", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ route, price }) });
                setRoute(""); setPrice("");
                toast({ title: "Added" });
                onRefresh();
              } catch (e) {
                toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
              } finally {
                setAdding(false);
              }
            }}
            className="w-full sm:w-auto gap-2"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? "Adding…" : "Add Fare"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {items.map((item) => (
          <ItemCard key={item._id} title={item.route} badge={item.price}>
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Route"><Input className="h-10" id={`route-${item._id}`} defaultValue={item.route} /></Field>
              <Field label="Price"><Input className="h-10" id={`price-${item._id}`} defaultValue={item.price} /></Field>
            </div>
            <ActionButtons
              onSave={async () => {
                const routeVal = (document.getElementById(`route-${item._id}`) as HTMLInputElement).value;
                const priceVal = (document.getElementById(`price-${item._id}`) as HTMLInputElement).value;
                await api(`/api/admin/popular-fares/${item._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ route: routeVal, price: priceVal }) });
                toast({ title: "Updated" });
                onRefresh();
              }}
              onDelete={async () => {
                await api(`/api/admin/popular-fares/${item._id}`, { method: "DELETE" });
                onRefresh();
              }}
            />
          </ItemCard>
        ))}
      </div>
    </>
  );
}

function TeamTab({ items, onRefresh }: { items: TeamMember[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", role: "", imageUrl: "" });
  const [adding, setAdding] = useState(false);

  return (
    <>
      <Card className="border-border/60 shadow-sm border-dashed">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Add Team Member</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 space-y-3">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10" /></Field>
            <Field label="Role"><Input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="h-10" /></Field>
            <Field label="Photo" className="sm:col-span-2 lg:col-span-3">
              <ImageUpload value={form.imageUrl} onChange={(url) => setForm({ ...form, imageUrl: url })} previewClassName="h-24 w-24 rounded-full" />
            </Field>
          </div>
          <Button
            disabled={adding}
            onClick={async () => {
              setAdding(true);
              try {
                await api("/api/admin/team-members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                setForm({ name: "", role: "", imageUrl: "" });
                toast({ title: "Added" });
                onRefresh();
              } catch (e) {
                toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
              } finally {
                setAdding(false);
              }
            }}
            className="w-full sm:w-auto gap-2"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? "Adding…" : "Add Member"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {items.map((item) => <EditableTeamCard key={item._id} item={item} onRefresh={onRefresh} />)}
      </div>
    </>
  );
}

function VideosTab({ items, onRefresh }: { items: TestimonialVideo[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ src: "", title: "" });
  const [adding, setAdding] = useState(false);

  const submitVideo = async () => {
    const embedSrc = toYouTubeEmbedUrl(form.src);
    setAdding(true);
    try {
      await api("/api/admin/testimonial-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, src: embedSrc }),
      });
      setForm({ src: "", title: "" });
      toast({ title: "Video added" });
      onRefresh();
    } catch (e) {
      toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <Card className="border-border/60 shadow-sm border-dashed">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Add Testimonial Video</CardTitle>
          <CardDescription>Paste any YouTube link — watch, share, or shorts. We convert to embed automatically.</CardDescription>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="YouTube URL" className="sm:col-span-2">
              <YouTubeUrlInput
                value={form.src}
                onChange={(src) => setForm({ ...form, src })}
                className="h-10"
              />
            </Field>
            <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10" /></Field>
          </div>
          <Button onClick={submitVideo} disabled={adding || !form.src.trim()} className="w-full sm:w-auto gap-2">
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? "Adding…" : "Add Video"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {items.map((item) => <EditableVideoCard key={item._id} item={item} onRefresh={onRefresh} />)}
      </div>
    </>
  );
}

function EditableVideoCard({ item, onRefresh }: { item: TestimonialVideo; onRefresh: () => void }) {
  const [form, setForm] = useState({ src: item.src, title: item.title });
  const { toast } = useToast();

  return (
    <ItemCard title={item.title}>
      <div className="space-y-3">
        <Field label="YouTube URL">
          <YouTubeUrlInput
            value={form.src}
            onChange={(src) => setForm({ ...form, src })}
            className="h-10 text-xs sm:text-sm"
          />
        </Field>
        <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="h-10" /></Field>
      </div>
      <ActionButtons
        onSave={async () => {
          const embedSrc = toYouTubeEmbedUrl(form.src);
          await api(`/api/admin/testimonial-videos/${item._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, src: embedSrc }),
          });
          setForm((f) => ({ ...f, src: embedSrc }));
          toast({ title: "Updated" });
          onRefresh();
        }}
        onDelete={async () => {
          await api(`/api/admin/testimonial-videos/${item._id}`, { method: "DELETE" });
          onRefresh();
        }}
      />
    </ItemCard>
  );
}

function ReviewsTab({ items, onRefresh }: { items: CustomerReview[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", location: "", route: "", rating: 5, review: "", avatar: "" });
  const [generating, setGenerating] = useState(false);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <>
      <Button
        variant="secondary"
        className="w-full sm:w-auto gap-2"
        disabled={generating}
        onClick={async () => {
          setGenerating(true);
          try {
            await api("/api/admin/reviews", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "generate", count: 3 }) });
            toast({ title: "Generated 3 fake reviews" });
            onRefresh();
          } catch (e) {
            toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
          } finally {
            setGenerating(false);
          }
        }}
      >
        {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Star className="w-4 h-4" />}
        {generating ? "Generating…" : "Generate 3 Fake Reviews"}
      </Button>
      <Card className="border-border/60 shadow-sm border-dashed">
        <CardHeader className="px-4 sm:px-6">
          <CardTitle className="text-base sm:text-lg">Add Review Manually</CardTitle>
        </CardHeader>
        <CardContent className="px-4 sm:px-6 grid sm:grid-cols-2 gap-3">
          <Field label="Name"><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-10" /></Field>
          <Field label="Location"><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="h-10" /></Field>
          <Field label="Route"><Input value={form.route} onChange={(e) => setForm({ ...form, route: e.target.value })} className="h-10" /></Field>
          <Field label="Rating (1-5)"><Input type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} className="h-10" /></Field>
          <Field label="Avatar" className="sm:col-span-2">
            <ImageUpload value={form.avatar} onChange={(url) => setForm({ ...form, avatar: url })} previewClassName="h-20 w-20 rounded-full" />
          </Field>
          <Field label="Review" className="sm:col-span-2"><Textarea value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} className="min-h-[80px]" /></Field>
          <Button
            disabled={adding}
            onClick={async () => {
              setAdding(true);
              try {
                await api("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
                toast({ title: "Review added" });
                onRefresh();
              } catch (e) {
                toast({ title: "Failed", description: (e as Error).message, variant: "destructive" });
              } finally {
                setAdding(false);
              }
            }}
            className="sm:col-span-2 w-full sm:w-auto gap-2"
          >
            {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
            {adding ? "Adding…" : "Add Review"}
          </Button>
        </CardContent>
      </Card>
      <div className="space-y-3">
        {items.map((item) => (
          <Card key={item._id} className="border-border/60 shadow-sm">
            <CardContent className="p-4 sm:p-5 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-semibold">{item.name}</p>
                <Badge variant="outline">{item.rating}★</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{item.location} · {item.route}</p>
              <p className="text-sm leading-relaxed">{item.review}</p>
              <Button
                size="sm"
                variant="destructive"
                className="w-full sm:w-auto gap-2 mt-1"
                disabled={deletingId === item._id}
                onClick={async () => {
                  if (!item._id) return;
                  setDeletingId(item._id);
                  try {
                    await api(`/api/admin/reviews/${item._id}`, { method: "DELETE" });
                    toast({ title: "Review deleted" });
                    onRefresh();
                  } catch (e) {
                    toast({ title: "Delete failed", description: (e as Error).message, variant: "destructive" });
                  } finally {
                    setDeletingId(null);
                  }
                }}
              >
                {deletingId === item._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                {deletingId === item._id ? "Deleting…" : "Delete"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
