import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./Database/db";
import cors from "cors";
import { Room } from "./Database/models/Room";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Booking backend is running");
});

// =============================    GET ALL ROOMS WITH MONGO   ================================

// GET /api/rooms

app.get("/api/rooms", async (req: Request, res: Response) => {
  try {
    const rooms = await Room.find();
    res.json({ rooms: rooms });
  } catch (err) {
    console.log("Failed to get rooms : ", err);
    res.status(500).json({ error: "Failed to get rooms" });
  }
});

// GET Rooms by id
app.get("/api/rooms/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);

    if (!room) {
      return res.status(400).json({ error: "Room not found " });
    }
    return res.json({ room });
  } catch (err) {
    console.log("Failed to get room by id ", err);
    return res.status(500).json({ error: "Failed to get room" });
  }
});

// GET Saved Rooms
app.get("/api/rooms/favourites", async (req: Request, res: Response) => {
  try {
    const savedRooms = await Room.find({ isSaved: true });

    console.log("SAVED ROOMS : ", savedRooms);
    return res.json({ rooms: savedRooms });
  } catch (err) {
    console.log("Error while fetchind favourites rooms...");
    return res.status(500).json({ error: "Favourites otaqlar tapılmadı !" });
  }
});

// GET Filter rooms
// app.post("/api/rooms/search", async (req: Request, res: Response) => {
//   try {
//     const { checkIn, checkOut, adults, children, rooms, petFriendly } =
//       req.body;

//     // TARİXƏ GÖRƏ FİLTER EDİLMƏYƏCƏK...

//     if (!checkIn || !checkOut || !adults || !children || !rooms) {
//       return res.status(400).json({ error: "Doldurulmayan sahələr qalıb" });
//     }

//     const totalGuests = Number(adults) + Number(children);
//     const roomsNeeded = Number(rooms);

//     const filteredRooms = await Room.find({
//       available: true,
//       capacity: { $gte: totalGuests / roomsNeeded },
//     });

//     console.log("Filtered Rooms : ", filteredRooms);
//     res.json({
//       rooms: filteredRooms,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "### Failed while filtering rooms data" });
//   }
// });

app.post("/api/rooms/search", async (req: Request, res: Response) => {
  try {
    const {
      adults,
      children,
      rooms,
      petFriendly,
      minPrice,
      maxPrice,
      minRating,
      location,
      // New parameters from the client
      roomTypes,
      amenities,
    } = req.body;

    // Basic validation
    if (adults == null || children == null || rooms == null) {
      return res.status(400).json({ error: "Doldurulmayan sahələr qalıb" });
    }

    const totalGuests = Number(adults) + Number(children);
    const roomsNeeded = Number(rooms);
    const requiredCapacity = Math.ceil(totalGuests / roomsNeeded);

    // Build MongoDB query
    const query: Record<string, any> = {
      available: true,
      capacity: { $gte: requiredCapacity },
    };

    if (typeof petFriendly === "boolean") {
      query.petFriendly = petFriendly;
    }

    if (minPrice != null || maxPrice != null) {
      query.price = {};
      if (minPrice != null) query.price.$gte = Number(minPrice);
      if (maxPrice != null) query.price.$lte = Number(maxPrice);
    }

    if (minRating != null) {
      query.rating = { $gte: Number(minRating) };
    }

    if (location) {
      // Partial match, case-insensitive
      query.location = { $regex: new RegExp(location, "i") };
    }

    // --- NEW FILTER IMPLEMENTATION ---

    // Room Type Filter (Match any selected type)
    if (Array.isArray(roomTypes) && roomTypes.length > 0) {
      query.roomType = { $in: roomTypes };
      // NOTE: Assumes your Room model has a 'roomType' field (String)
    }

    // Amenities Filter (Match all selected amenities)
    if (Array.isArray(amenities) && amenities.length > 0) {
      query.amenities = { $all: amenities };
      // NOTE: Assumes your Room model has an 'amenities' field (Array of Strings)
    }

    // --- END NEW FILTER IMPLEMENTATION ---

    const filteredRooms = await Room.find(query);

    res.json({
      count: filteredRooms.length,
      rooms: filteredRooms,
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Serverdə xəta baş verdi" });
  }
});

// update rooms by id {isSaved}
app.patch("/api/rooms/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const { isSaved } = req.body;

    console.log("REQUEST BODY:", req.body);
    if (typeof isSaved !== "boolean") {
      return res.status(400).json({ error: "isSaved boolean olmalıdır!" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { isSaved },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: "Otaq tapılmadı!" });
    }

    res.json(updatedRoom);
  } catch (err) {
    console.error("Error updating room:", err);
    res.status(500).json({ errorMessage: "### Failed to update room" });
  }
});

app.listen(PORT, () => console.log(`Server running at localhost://${PORT} !`));
