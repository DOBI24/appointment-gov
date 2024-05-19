# Okmányirodai ügyintézés időpontfoglaló oldal

## ADMIN FELHASZNÁLÓ:
- email: admin@admin.com
- jelszó: adminadmin

| Elem | Útvonal | Állapot |
|------|---------|------------|
| Fordítási hiba nincs (ng serve kiadásakor nincs hiba) | - | :heavy_check_mark: |
| Futtatási hiba nincs (böngésző konzol részében nincs hiba)| - | :heavy_check_mark: |
| Firebase Hosting URL (létezik, és minden végpont megfelelő módon betöltődik) | https://dobi-appointment-app.web.app | :heavy_check_mark: |
| Adatmodell definiálása | [models] | :heavy_check_mark: |
| Alkalmazás felbontása megfelelő számú komponensre | - | :heavy_check_mark: |
| Reszponzív, mobile-first felület | - | :heavy_check_mark: |
| Legalább 2 különböző attribútum direktíva használata | [ngStyle], [ngClass] | :heavy_check_mark: |
| Legalább 2 különböző strukturális direktíva használata | [ngFor], [ngIf] | :heavy_check_mark: |
| Adatátadás szülő és gyermek komponensek között | [Input], [Output] | :heavy_check_mark: |
| Legalább 10 különböző Material elem helyes használata | [Button], [Card], [FormField], [Icon], [Input], [Select], [Sidenav], [Snackbar], [Stepper], [Table], [Tabs] (11 db) | :heavy_check_mark: |
| Adatbevitel Angular form-ok segítségével megvalósítva (legalább 2) | [Form1], [Form2] | :heavy_check_mark: |
| Legalább 1 saját Pipe osztály írása és használata | [Pipe], [PipeUse] | :heavy_check_mark: |
| Legalább 2 különböző Lifecycle Hook használata a teljes projektben | [ngOnInit], [ngOnDestroy] | :heavy_check_mark: |
| CRUD műveletek mindegyike megvalósult | [Create], [Read], [Update], [Delete] | :heavy_check_mark: |
| CRUD műveletek service-ekbe vannak kiszervezve és megfelelő módon injektálva lettek | [Services] | :heavy_check_mark: |
| Firestore adatbázis használata az adatokhoz | - | :heavy_check_mark: |
| Legalább 2 komplex Firestore lekérdezés megvalósítása | [Where], [OrderBy] | :heavy_check_mark: |
| Legalább 4 különböző route a különböző oldalak eléréséhez | [Routes] | :heavy_check_mark: |
| Legalább 2 route levédése azonosítással | [AuthGuard], [AdminGuard] | :heavy_check_mark: |


[models]: appointment-app/src/app/shared/model
[ngStyle]: appointment-app/src/app/shared/components/calendar/calendar.component.html#L6
[ngClass]: appointment-app/src/app/shared/components/calendar/calendar.component.html#L27
[ngFor]: appointment-app/src/app/shared/components/calendar/calendar.component.html#L7
[ngIf]: appointment-app/src/app/pages/login/login.component.html#L13
[Input]: appointment-app/src/app/shared/components/navbar/navbar.component.ts#L17
[Output]: appointment-app/src/app/shared/components/calendar/calendar.component.ts#L40
[Button]: appointment-app/src/app/pages/login/login.component.html#L26
[Card]: appointment-app/src/app/pages/register/register.component.html#3
[FormField]: appointment-app/src/app/pages/login/login.component.html#10
[Icon]: appointment-app/src/app/shared/components/user-list/user-list.component.html#L58
[Input]: appointment-app/src/app/pages/register/register.component.html#10
[Select]: appointment-app/src/app/pages/book/book.component.html#L11
[Sidenav]: appointment-app/src/app/app.component.html#L2
[Snackbar]: appointment-app/src/app/shared/components/user-list/user-list.component.ts#L93
[Stepper]: appointment-app/src/app/pages/book/book.component.html#L1
[Table]: appointment-app/src/app/shared/components/user-list/user-list.component.ts#L1
[Tabs]: appointment-app/src/app/pages/admin/admin.component.html#L1
[Form1]: appointment-app/src/app/pages/login/login.component.html#L2
[ngOnInit]: appointment-app/src/app/shared/components/appointment-list/appointment-list.component.ts#L65
[ngOnDestroy]: appointment-app/src/app/shared/components/appointment-list/appointment-list.component.ts#L81
[Form2]: appointment-app/src/app/pages/register/register.component.html#L2
[Pipe]: appointment-app/src/app/shared/pipes
[PipeUse]: appointment-app/src/app/shared/components/calendar/calendar.component.html#L11
[Create]: appointment-app/src/app/shared/services/appointment.service.ts#L13
[Read]: appointment-app/src/app/shared/services/appointment.service.ts#L18
[Update]: appointment-app/src/app/shared/services/user.service.ts#L25
[Delete]: appointment-app/src/app/shared/services/user.service.ts#L29
[Services]: appointment-app/src/app/shared/services
[Where]: appointment-app/src/app/shared/services/appointment.service.ts#L27
[OrderBy]: appointment-app/src/app/shared/services/appointment.service.ts#L19
[Routes]: appointment-app/src/app/app.routes.ts
[AuthGuard]: appointment-app/src/app/app.routes.ts#L24
[AdminGuard]: appointment-app/src/app/app.routes.ts#L34
