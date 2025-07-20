import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { connectDB } from "./Database/db";
import cors from "cors";
import { Room } from "./Database/models/Room";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
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

// all rooms
// app.get("/api/rooms", async (req: Request, res: Response) => {
//   try {
//     const fileContent = await fs.promises.readFile(filePath, "utf-8");
//     const roomsData = JSON.parse(fileContent);
//     res.json(roomsData);
//   } catch (err) {
//     console.log("Error reading rooms data !");
//     res.status(500).json({ error: "### Failed to read rooms data" });
//   }
// });

app.listen(PORT, () => console.log(`Server running at localhost://${PORT} !`));
