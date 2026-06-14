import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Booking, serializeDoc } from "@/lib/models";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingType, vehicleType, pickup, drop, date, time, name, phone } = body;

    if (!bookingType || !vehicleType || !pickup || !drop || !date || !time || !name || !phone) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();
    const booking = await Booking.create({
      bookingType,
      vehicleType,
      pickup,
      drop,
      date,
      time,
      name,
      phone,
    });

    return NextResponse.json({ success: true, booking: serializeDoc(booking.toObject()) });
  } catch (error) {
    console.error("Booking submit error:", error);
    return NextResponse.json({ error: "Failed to submit booking" }, { status: 500 });
  }
}
