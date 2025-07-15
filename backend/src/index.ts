import express, { Request, Response } from "express";
import { connectDB } from "./Database/db";
import fs from "fs";
import path from "path";
import cors from "cors";
import { Room } from "./Database/models/Room";
import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URL);
const app = express();
const PORT = process.env.PORT || 8080;

const router = express.Router();

app.use(cors());
app.use(express.json());
connectDB();

const filePath = path.join(__dirname, "./Database/rooms.json");

const fileContent = fs.readFileSync(filePath, "utf-8");
const roomsData = JSON.parse(fileContent);

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

    console.log(filteredRooms);
    res.json({
      rooms: filteredRooms,
    });
  } catch (err) {
    res.status(500).json({ error: "### Failed while filtering rooms data" });
  }
});

// update rooms by id
app.patch("/api/rooms/:id", async (req: Request, res: Response) => {
  try {
    const roomId = req.params.id;
    const { isSaved } = req.body;

    if (!isSaved) {
      return res.status(400).json({ error: "Status təyin edilməyib !" });
    }
    
    if (typeof isSaved !== "boolean") {
      return res.status(400).json({ error: "isSaved boolean olmalıdır !" });
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      roomId,
      { isSaved: isSaved },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ error: "Otaq tapılmadı !" });
    }

    res.json(updatedRoom);
    // const index = roomsData.rooms.findIndex((item: any) => item.id === roomId);

    // if (index === -1) {
    //   return res.status(404).json({ errorMessage: "Otaq tapılmadı" });
    // }

    // if (typeof isSaved === "boolean") {
    //   roomsData.rooms[index].isSaved = isSaved;
    //   fs.writeFileSync(filePath, JSON.stringify(roomsData, null, 2), "utf-8");
    // }
  } catch (err) {
    console.log("Error updating room : ", err);
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
