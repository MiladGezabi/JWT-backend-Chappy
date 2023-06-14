# Chappy Chatt Api
Detta är ett api som kan användas för att bygga en chatt app. Den innehåller 3 endpoints och nedan beskriver jag vad de gör samt datamodelering.

## Users endpoint

### Datamodelering av users
| **Egenskaper** | **Datatyp** | **Beskrivning**      |
|----------------|-------------|----------------------|
|    username    |   "String"  | Användarens namn     |
|    password    |   "String"  | Användarens lösenord |
|       id       |    Number   |     Ett unikt id     |

### user beskrivning

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

### Datamodelering av public
| **Egenskaper** | **Datatyp** | **Beskrivning** |
|----------------|-------------|-----------------|
|     message    |   "String"  | Ett medelande   |
|       id       |    number   | Ett unikt id    |

### public beskrivning

| **Method** |   **URL**   | **URL Params** | **Body** | **Response**                       |
|:----------:|:-----------:|:--------------:|----------|------------------------------------|
|     Get    | /api/public |                |          | Lista med all medelanden i public  |
|    Post    | /api/public |                | message  | Lägger till ett medelande i public |

#### exempel på hur en lista med public medelande kan se ut.
[
  {
    "id": 847,
    "message": "hej"
  },
  {
    "id": 9589,
    "message": "hejsan"
  }
]

## Private endpoint

### Datamodelering av Private
| **Egenskaper** | **Datatyp** | **Beskrivning**                         |
|:--------------:|:-----------:|-----------------------------------------|
|     message    |   "string"  |              Ett medelande              |
|       id       |    number   |               Ett unikt id              |
|      name      |   "string"  | namn på user som har skrivit medelandet |

### private beskrivning

| **Method** |       **URL**      | **URL Params** |      **Body**      | **Header**                      |                              **Response**                             |
|:----------:|:------------------:|:--------------:|:------------------:|---------------------------------|:---------------------------------------------------------------------:|
|    Post    | /api/private/login |                | username, password |                                 | Får tillbaka ett  jason web token som kan användas  upp till 1 timme. |
|     Get    |    /api/private    |                |                    | Authorization, Bearer {din jwt} |                 Lista med alla  medelanden  i private.                |
|    Post    |    /api/private    |                |       message      | Authorization, Bearer {din jwt} |                 Lägger till ett  medelande  i private.                |

#### exempel på hur en lista med privata medelande kan se ut.
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