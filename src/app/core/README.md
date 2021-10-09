should contain singleton services (which is usually the case)

other features where there’s only once instance per application.

The http folder handles stuff like http calls from our application. I’ve also added a api.service.ts file to keep all http calls running through our application in one single place. The folder does otherwise contain folders for interacting with the different API-routes.
|-- http
|-- user
|-- user.service.ts|spec.ts
|-- api.service.ts|spec.ts

https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7
