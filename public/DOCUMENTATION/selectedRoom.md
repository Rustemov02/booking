## 🛏️ Otaq Seçimi Sonrası Backend Cavabı - Detallar

Bu cavab, istifadəçi konkret bir otağı seçdikdən sonra həmin otağın daha ətraflı məlumatlarını təqdim etməlidir.

### Response Format:

```json
{
  "room": {
    "id": "room_101",  // Otağın unikal ID-si
    "hotelId": "hotel_001",  // Otelin ID-si
    "hotelName": "City Hotel",  // Otelin adı
    "name": "Standard Room",  // Otağın adı
    "description": "Comfortable room with city view",  // Otağın təsviri
    "capacity": 2,  // Otağın tutumu (nəfər sayı)
    "pricePerNight": 85,  // Bir gecənin qiyməti
    "totalPrice": 255,  // Seçilən tarixə görə ümumi qiymət (hesablanmışdır)
    "available": true,  // Otağın mövcudluğu
    "images": [  // Otağın şəkilləri
      "https://example.com/images/room_101_1.jpg",
      "https://example.com/images/room_101_2.jpg"
    ],
    "amenities": [  // Otağın xidmətləri
      "WiFi", 
      "Air Conditioning", 
      "TV"
    ],
    "cancellationPolicy": "Free cancellation until 24h before check-in",  // Ləğv etmə şərtləri
    "roomSize": 22,  // Otağın ölçüsü (kvadratmetr)
    "bedType": "Double Bed",  // Yatak növü
    "checkInTime": "14:00",  // Giriş saatı
    "checkOutTime": "11:00",  // Çıxış saatı
    "additionalCharges": [  // Əlavə xərclər varsa (məsələn, vergi, əlavə xidmətlər)
      {
        "name": "City Tax",
        "amount": 5
      }
    ]
  }
}


 
## Əlavə Sahələr və Açıqlamalar:

- **`hotelId` və `hotelName`**: Bu sahələr, bir neçə otelin olduğu bir sistemdə, istifadəçinin seçdiyi otağın hansı oteldən olduğunu göstərəcək.
  
- **`checkInTime` və `checkOutTime`**: Bu, istifadəçinin otağa giriş və çıxış saatlarını qeyd etmək üçün əlavə edilə bilər.
  
- **`additionalCharges`**: Əlavə ödənişlər varsa (məsələn, vergi və ya xüsusi xidmətlər), bu sahədə göstərilə bilər.
  
- **`totalPrice`**: Otaq üçün ümumi qiymət, istifadəçinin seçdiyi tarixə və əlavə ödənişlərə əsasən backend tərəfindən hesablanmalıdır.
  
- **`available`**: Hər otağın "mövcud" olub-olmaması. Bu sahə yalnız seçilən otaq üçün təqdim ediləcək.
