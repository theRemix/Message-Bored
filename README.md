# Message Bored

Angular 1.x Exercise


## Setup the Server

1. create a new node project using `npm`
1. add the `express` and `body-parser` dependency
1. add the `sequelize` `pg` and `pg-hstore` dependencies
1. initialize a new `sequelize` project
1. create a postgres user named `bored` with a password
1. create a postgres database named `message_bored` owned by `bored`
1. update `config/config.json`
1. create a 3 models, `Users`, `Topics`, and `Messages` _refer to **[schemas](#schemas)**_
1. sync your models with postgres _refer to **[sql](#sql)**_
1. setup an express project in `index.js`
1. set up express static middleware configured to serve content from `./public`
1. set up express static middleware for `body-parser`
1. add router middleware for `/api` to use the `/api/index.js` module
1. `/api/index.js` will require and use the three modules, `./messages`, `./topics`, `./users`
1. implement the routes defined in **[routes](#routes)**

## Setup the Client

1. create the `./public` directory
1. create the `./public/index.html` html5 boilerplate code
1. include the latest stable angular 1.x minified `angular` js source file
1. include the latest stable angular 1.x minified `angular-router` js source file
1. create the `./public/scripts` directory
1. create the `./public/scripts/app.js` source file
1. include the `./scripts/app.js` source file



### Schemas

_**hint**: while writing your models, `db.sequelize.sync({force:true})` is helpful_

#### Users

| Property | Type   | Options |
| -------- | ------ | ------- |
| name     | string | not null, unique  |

#### Topics

| Property    | Type   | Options          |
| ----------- | ------ | ---------------- |
| name        | string | not null, unique |

| created_by  | integer | fk to Users.id   |

#### Messages

| Property   | Type    | Options         |
| ---------- | ------- | --------------- |
| body       | text    | not null        |

| author_id  | integer | fk to Users.id  |
| topic_id   | integer | fk to Topics.id |

#### Relationships

## SQL

`\dS "Users"`

```
                                    Table "public.Users"
  Column   |           Type           |                      Modifiers
-----------+--------------------------+------------------------------------------------------
 id        | integer                  | not null default nextval('"Users_id_seq"'::regclass)
 name      | character varying(255)   | not null
 createdAt | timestamp with time zone | not null
 updatedAt | timestamp with time zone | not null
Indexes:
    "Users_pkey" PRIMARY KEY, btree (id)
    "Users_name_key" UNIQUE CONSTRAINT, btree (name)
Referenced by:
    TABLE ""Messages"" CONSTRAINT "Messages_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL
    TABLE ""Topics"" CONSTRAINT "Topics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL
```

`\dS "Topics"`

```
                                     Table "public.Topics"
   Column   |           Type           |                       Modifiers
------------+--------------------------+-------------------------------------------------------
 id         | integer                  | not null default nextval('"Topics_id_seq"'::regclass)
 name       | character varying(255)   | not null
 createdAt  | timestamp with time zone | not null
 updatedAt  | timestamp with time zone | not null
 created_by | integer                  |
Indexes:
    "Topics_pkey" PRIMARY KEY, btree (id)
    "Topics_name_key" UNIQUE CONSTRAINT, btree (name)
Foreign-key constraints:
    "Topics_created_by_fkey" FOREIGN KEY (created_by) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL
Referenced by:
    TABLE ""Messages"" CONSTRAINT "Messages_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES "Topics"(id) ON UPDATE CASCADE ON DELETE SET NULL
```

`\dS "Messages"`

```
                                    Table "public.Messages"
  Column   |           Type           |                        Modifiers
-----------+--------------------------+---------------------------------------------------------
 id        | integer                  | not null default nextval('"Messages_id_seq"'::regclass)
 name      | text                     | not null
 createdAt | timestamp with time zone | not null
 updatedAt | timestamp with time zone | not null
 author_id | integer                  |
 topic_id  | integer                  |
Indexes:
    "Messages_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "Messages_author_id_fkey" FOREIGN KEY (author_id) REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL
    "Messages_topic_id_fkey" FOREIGN KEY (topic_id) REFERENCES "Topics"(id) ON UPDATE CASCADE ON DELETE SET NULL
```

## Routes

| module source file    | route                        | action                                                                                          |
| --------------------- | ---------------------------- | ----------------------------------------------------------------------------------------------- |
| api/users/index.js    | GET /api/users               | respond with all users                                                                          |
| api/users/index.js    | GET /api/users/:id           | respond with user and all messages author'd by this user                                        |
| api/topics/index.js   | GET /api/topics              | respond with all topics including the creator's name                                            |
| api/topics/index.js   | POST /api/topics             | create and respond with a new topic                                                             |
| api/topics/index.js   | PUT /api/topics/:name        | update and respond with the updated topic                                                       |
| api/messages/index.js | GET /api/messages/latest     | respond with the latest 10 messages including the name of the topic including the author's name |
| api/messages/index.js | POST /api/messages           | create and respond with the new message                                                         |
| api/messages/index.js | GET /api/messages/:topic_id  | respond with all messages that belong to the topic by :topic_id                                 |


## Stretch Goals

1. add supertest
1. enable auth
1. add protractor tests
