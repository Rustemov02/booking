# 🏨 Room Availability API Spec

## ✅ Endpoint

`GET /api/rooms/availability`

Bu endpoint istifadəçinin seçdiyi tarix və nəfər sayına uyğun olaraq mövcud otaqları qaytarır.

---

## 📥 Query Parameters

| Parametr   | Tip    | Təsviri                   | Nümunə       |
| ---------- | ------ | ------------------------- | ------------ |
| `checkIn`  | string | Gəlmə tarixi (ISO format) | `2025-06-01` |
| `checkOut` | string | Çıxış tarixi (ISO format) | `2025-06-05` |
| `adults`   | number | Böyüklərin sayı           | `2`          |
| `children` | number | Uşaq sayı                 | `1`          |
| `rooms`    | number | Otaq sayı                 | `2`          |

---

## 📤 Response Format

```json
{
  "rooms": [
    {
      "id": "room_101",
      "name": "Standard Room",
      "description": "Comfortable room with city view",
      "capacity": 2,
      "pricePerNight": 85,
      "totalPrice": 255,
      "available": true,
      "images": [
        "https://example.com/images/room_101_1.jpg",
        "https://example.com/images/room_101_2.jpg"
      ],
      "amenities": ["WiFi", "Air Conditioning", "TV"],
      "cancellationPolicy": "Free cancellation until 24h before check-in",
      "roomSize": 22,
      "bedType": "Double Bed"
    }
  ]
}
```

---

## 📝 Qeydlər

- `totalPrice` backend tərəfindən avtomatik hesablanmalıdır (`pricePerNight * gecə sayı`).
- `available` sahəsi yalnız uyğun olan otaqlarda `true` olmalıdır.
- Əgər uyğun otaq yoxdursa, `rooms: []` boş array qaytarıla bilər.
- Əlavə olaraq, `hotelName` və ya `hotelId` sahələri də daxil edilə bilər əgər bir neçə otel varsa.

---

## 📚 Əlavə İzahlar

### 🔢 `totalPrice`

- Bu sahə `pricePerNight` ilə gecə sayı (`checkOut - checkIn`) əsasında backend tərəfindən avtomatik hesablanmalıdır.
- Frontend bu sahəni alıb birbaşa göstərməlidir, hesablamanı təkrarlamağa ehtiyac yoxdur.

### ✅ `available`

- Backend yalnız uyğun otaqlar üçün `available: true` dəyəri qaytarmalıdır.
- Uyğun olmayan otaqlar cavabda ya çıxmamalıdır, ya da `available: false` olaraq qaytarıla bilər (dizayna uyğun).

### ❌ Uyğun otaq olmadıqda

- Əgər göstərilən tarixlər və nəfər sayına uyğun heç bir otaq yoxdursa:

```json
{
  "rooms": []
}
```
