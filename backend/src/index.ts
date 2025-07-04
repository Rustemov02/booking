import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 8080;

app.use(express.json());

const filePath = path.join(__dirname, "./Database/rooms.json");

const fileContent = fs.readFileSync(filePath, "utf-8");
const roomsData = JSON.parse(fileContent);

// all rooms
app.get("/api/rooms", (req: Request, res: Response) => {
  try {
    res.json(roomsData);
  } catch (err) {
    console.log("Error reading rooms data !");
    res.status(500).json({ error: "### Failed to read rooms data" });
  }
});

// filter rooms

app.post("/api/rooms/search", (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut, adults, children, rooms } = req.body;

    if (!checkIn || !checkOut || !adults || !children || !rooms) {
      res.status(400).json({ error: "Doldurulmayan sahələr qalıb" });
    }

    const totalGuests = Number(adults) + Number(children);
    const roomsNeeded = Number(rooms);

    const filteredRooms = roomsData.rooms.filter((room: any) => {
      const totalCapacity = room.capacity * roomsNeeded;
      return room.available === true && totalCapacity >= totalGuests;
    });
    
    res.json({ rooms: filteredRooms });
  } catch (err) {
    res.status(500).json({ error: "### Failed while filtering rooms data" });
  }
});

app.listen(PORT, () => console.log(`Server running at localhost://${PORT} !`));
