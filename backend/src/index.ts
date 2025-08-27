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
app.post("/api/rooms/search", async (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, adults, children, rooms, petFriendly } =
      req.body;

    // TARİXƏ GÖRƏ FİLTER EDİLMƏYƏCƏK...

    if (!checkIn || !checkOut || !adults || !children || !rooms) {
      return res.status(400).json({ error: "Doldurulmayan sahələr qalıb" });
    }

    const totalGuests = Number(adults) + Number(children);
    const roomsNeeded = Number(rooms);

    const filteredRooms = await Room.find({
      available: true,
      capacity: { $gte: totalGuests / roomsNeeded },
    });

    console.log("Filtered Rooms : ", filteredRooms);
    res.json({
      rooms: filteredRooms,
    });
  } catch (err) {
    res.status(500).json({ error: "### Failed while filtering rooms data" });
  }
});

// update rooms by id {isSaved}
app.patch("/api/rooms/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const { isSaved } = req.body;

    console.log("ROOM ID:", roomId);

    if (typeof isSaved !== "boolean") {
      return res.status(400).json({ error: "isSaved boolean olmalıdır!" });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ error: "Düzgün ObjectId göndərilməyib!" });
    }

    const objectId = new mongoose.Types.ObjectId(roomId);

    const updatedRoom = await Room.findOneAndUpdate(
      { _id: objectId },
      { isSaved },
      { new: true }
    );

    await console.log("Room updated ", updatedRoom);

    if (!updatedRoom) {
      return res.status(404).json({ error: "Otaq tapılmadı!" });
    }

    res.json(updatedRoom);
  } catch (err) {
    console.error("Error updating room:", err);
    res.status(500).json({ errorMessage: "### Failed to update room" });
  }
});


app.get("/test-fav", (req, res) => {
  console.log("Test favourites hit!");
  res.json({ ok: true });
});

app.listen(PORT, () => console.log(`Server running at localhost://${PORT} !`));
