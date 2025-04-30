# Plant Care Application - Frontend Guide

## 📋 Proje Hakkında
Plant Care uygulaması, bitkilerin sağlık durumlarını takip etmek ve yönetmek için geliştirilmiş bir web uygulamasıdır. Bu doküman, frontend geliştiriciler için API entegrasyonu ve kullanımı hakkında bilgiler içerir.

## 🔗 API Endpoints

### Bitki İşlemleri

#### Tüm Bitkileri Listele
```http
GET /api/plants
```

#### Yeni Bitki Ekle
```http
POST /api/plants
Content-Type: application/json

{
  "name": "Orkide",
  "type": "Çiçek",
  "weeklyWaterNeed": 0.5,
  "expectedHumidity": 60,
  "location": "Salon",
  "latitude": 41.0082,
  "longitude": 28.9784
}
```

#### Bitki Detaylarını Görüntüle
```http
GET /api/plants/{id}
```

#### Bitki Güncelle
```http
PUT /api/plants/{id}
Content-Type: application/json

{
  "name": "Yeni Bitki Adı",
  "weeklyWaterNeed": 1.0
}
```

#### Bitki Sil
```http
DELETE /api/plants/{id}
```

### Bitki Sağlık Durumu

#### Bitki Sağlık Durumunu Kontrol Et
```http
GET /api/plants/{id}/health?start=2024-04-30&end=2024-05-07
```

Response örneği:
```json
{
  "status": "healthy",
  "lastWatered": "2024-04-30T10:00:00Z",
  "nextWatering": "2024-05-02T10:00:00Z",
  "humidity": 65,
  "temperature": 22,
  "recommendations": [
    "Bitkiyi 2 gün sonra sulayın",
    "Nem seviyesi uygun"
  ]
}
```

## 🔑 Önemli Notlar

1. **Tarih Formatı**: Tüm tarihler ISO 8601 formatında (YYYY-MM-DD) gönderilmelidir.

2. **Konum Bilgileri**: Bitki sağlık durumu kontrolü için bitkinin konum bilgileri (latitude, longitude) gereklidir.

3. **Hata Yönetimi**: API'den dönen hata mesajları şu formatta olacaktır:
```json
{
  "message": "Hata mesajı"
}
```

4. **CORS**: API CORS politikası ile korunmaktadır. Frontend uygulamanızın domain'i izin verilenler listesinde olmalıdır.

## 🚀 Hızlı Başlangıç

1. API'yi test etmek için Postman koleksiyonunu kullanabilirsiniz.
2. Swagger UI dokümantasyonunu inceleyin: `https://codzigo-backend.vercel.app/api-docs`
3. Örnek bir bitki ekleyerek API'yi test edin.

## 📚 Örnek Kod

### Axios ile API Kullanımı

```javascript
import axios from 'axios';

const API_BASE_URL = 'https://codzigo-backend.vercel.app/api';

// Tüm bitkileri getir
const getPlants = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/plants`);
    return response.data;
  } catch (error) {
    console.error('Bitkiler getirilirken hata oluştu:', error);
    throw error;
  }
};

// Yeni bitki ekle
const addPlant = async (plantData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/plants`, plantData);
    return response.data;
  } catch (error) {
    console.error('Bitki eklenirken hata oluştu:', error);
    throw error;
  }
};

// Bitki sağlık durumunu kontrol et
const checkPlantHealth = async (plantId, startDate, endDate) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/plants/${plantId}/health?start=${startDate}&end=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error('Sağlık durumu kontrol edilirken hata oluştu:', error);
    throw error;
  }
};
```

## 🛠 Geliştirme Ortamı

- API Base URL: `https://codzigo-backend.vercel.app/api`
- Swagger UI: `https://codzigo-backend.vercel.app/api-docs`
- Content-Type: `application/json`

## 📞 İletişim

Herhangi bir sorunuz veya öneriniz için proje yöneticisi ile iletişime geçebilirsiniz. 