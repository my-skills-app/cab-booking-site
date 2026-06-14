"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export function BookingForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = {
      bookingType,
      vehicleType,
      pickup: (form.elements.namedItem("pickup") as HTMLInputElement).value,
      drop: (form.elements.namedItem("drop") as HTMLInputElement).value,
      date: (form.elements.namedItem("date") as HTMLInputElement).value,
      time: (form.elements.namedItem("time") as HTMLInputElement).value,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Request Submitted!",
        description: "We will call you back on your provided number soon.",
      });
      form.reset();
      setBookingType("");
      setVehicleType("");
    } catch {
      toast({
        title: "Error",
        description: "Could not submit request. Please call us directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-10 border border-border max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-display font-black text-foreground uppercase tracking-tight">Request a Call Back</h2>
        <div className="h-1 w-20 bg-primary mx-auto mt-2 rounded-full" />
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-2">
          <Label htmlFor="bookingType">Booking Type *</Label>
          <Select required value={bookingType} onValueChange={setBookingType}>
            <SelectTrigger id="bookingType" className="h-12 rounded-lg">
              <SelectValue placeholder="Select Booking Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="oneway">One Way Trip</SelectItem>
              <SelectItem value="roundtrip">Round Trip</SelectItem>
              <SelectItem value="local">Local Rental</SelectItem>
              <SelectItem value="airport">Airport Transfer</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vehicleType">Vehicle Type *</Label>
          <Select required value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger id="vehicleType" className="h-12 rounded-lg">
              <SelectValue placeholder="Select Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sedan">Sedan (4 Seater)</SelectItem>
              <SelectItem value="suv">SUV (6-7 Seater)</SelectItem>
              <SelectItem value="hatchback">Hatchback (Economy)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickup">Pickup Location *</Label>
          <Input id="pickup" name="pickup" placeholder="Enter Pickup City" required className="h-12 rounded-lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="drop">Drop Location *</Label>
          <Input id="drop" name="drop" placeholder="Enter Destination City" required className="h-12 rounded-lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">Travel Date *</Label>
          <Input id="date" name="date" type="date" required className="h-12 rounded-lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="time">Booking Time *</Label>
          <Input id="time" name="time" type="time" required className="h-12 rounded-lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="Your Name" required className="h-12 rounded-lg" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" name="phone" placeholder="Your Mobile Number" required className="h-12 rounded-lg" />
        </div>

        <div className="md:col-span-2 mt-6">
          <Button type="submit" className="w-full h-14 rounded-xl bg-foreground text-background hover:bg-foreground/90 text-lg font-bold shadow-xl transition-all" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
          <p className="text-center text-xs text-muted-foreground mt-4">
            By submitting, you agree to receive a call back for booking assistance.
          </p>
        </div>
      </form>
    </div>
  );
}
