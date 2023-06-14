# Chappy Chatt Api
Detta är ett api som kan användas för att bygga en chatt app. Den innehåller 3 endpoints: users, public och private. public har två kannaler: Allmänt och Random. private har två kannaler: Koda och Aktier. nedan beskriver jag vad de gör samt datamodelering.

## Users endpoint

### Datamodelering av users endpoint.
| **Egenskaper** | **Datatyp** | **Beskrivning**      |
|----------------|-------------|----------------------|
|    username    |   "String"  | Användarens namn     |
|    password    |   "String"  | Användarens lösenord |
|       id       |    Number   |     Ett unikt id     |

### users beskrivning

| **Method** | **URL**    | **URL Params** | **Body**           | **Response**                    |
|:----------:|------------|----------------|--------------------|---------------------------------|
|     Get    | /api/users |                |                    | En lista med all users          |
|     Get    | /api/users |      /:id      |                    | En specefic user                |
|    Post    | /api/users |                | username, password | Lägger till en user i databasen |
|     Put    | /api/users |      /:id      | username, password | Ändrar en specific user         |
|   Delete   | /api/users |      /:id      |                    | Tar bort en specific user       |

#### exempel på hur en lista av user kan ser ut.
```
[
  {
    "id": 1,
    "username": "admin",
    "password": "password"
  },
  {
    "id": 2,
    "username": "user1",
    "password": "password1"
  }
]
```


## Public endpoint

### Datamodelering av public endpoint
| **Egenskaper** | **Datatyp** |              **Beskrivning**             |
|:--------------:|:-----------:|:----------------------------------------:|
|       id       |    number   |               Ett unikt id               |
|     message    |   "string"  |           Ett sträng medelande           |
|      name      |   "string"  | namn på personen som skrivit medelandet. |

#### exempel på hur en lista i public kannalerna kan se ut.
```
"messages": [
        {
          "id": 84,
          "message": "Välkommen till Allmänt kanalen",
          "name": "admin"
        },
        {
          "message": "testing public message",
          "name": "guest",
          "id": 333599805
        }
      ]
```
### public: allmänt kannalen beskrivning

| **Method** |       **URL**       | **URL Params** |          **Body**         |                        **Response**                       |
|:----------:|:-------------------:|:--------------:|:-------------------------:|:---------------------------------------------------------:|
|     Get    | /api/public/allmant |                |                           | Returnerar  en lista av medelanden från allmänt kannalen. |
|    Post    | /api/public/allmant |                | "message": "", "name": "" |       Skickar ett  medelande till allmänt kannalen.       |


### public: random kannalen beskrivning
| **Method** |       **URL**      | **URL Params** |          **Body**         |                       **Response**                       |
|:----------:|:------------------:|:--------------:|:-------------------------:|:--------------------------------------------------------:|
|     Get    | /api/public/random |                |                           | Returnerar  en lista av medelanden från random kannalen. |
|    Post    | /api/public/random |                | "message": "", "name": "" |       Skickar ett  medelande till random kannalen.       |

## Private endpoint

### Datamodelering av Private
| **Egenskaper** | **Datatyp** | **Beskrivning**                         |
|:--------------:|:-----------:|-----------------------------------------|
|     message    |   "string"  |              Ett medelande              |
|       id       |    number   |               Ett unikt id              |
|      name      |   "string"  | namn på user som har skrivit medelandet |

#### exempel på hur en lista med privata medelande kan se ut.
```
[
  {
    "id": 9485,
    "name": "albert",
    "message": "hallå där"
  },
  {
    "id": 46587,
    "name": "björn",
    "message": "Jag är hungrig"
  }
]
```

### private: koda kannalen beskrivning

| **Method** | **URL**           | **URL Params** | **Body**      | **Header**                  | **Response**                                          |
|------------|-------------------|----------------|---------------|-----------------------------|-------------------------------------------------------|
|     Get    | /api/private/koda |                |               | Authorization, Bearer [jwt] | Returnerar en lista av medelanden från koda kannalen. |
|    Post    | /api/private/koda |                | "message": "" | Authorization, Bearer [jwt] |       Skickar ett Medelande till koda kannalen.       |

### private: Aktier kannalen beskrivning
| **Method** | **URL**             | **URL Params** | **Body**      | **Header**                  | **Response**                                            |
|------------|---------------------|----------------|---------------|-----------------------------|---------------------------------------------------------|
|     Get    | /api/private/aktier |                |               | Authorization, Bearer [jwt] | Returnerar en lista av medelanden från aktier kannalen. |
|    Post    | /api/private/aktier |                | "message": "" | Authorization, Bearer [jwt] |       Skickar ett Medelande till aktier kannalen.       |