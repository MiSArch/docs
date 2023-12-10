# Making keycloak production ready

By default, Misarch creates a few test accounts inside the `Misarch` realm with easy logins.\
In particular, those are
- `admin`
- `seller`
- `test`

You should delete these accounts before publishing the platform to keep the permission system in tact.

Furthermore, you should change the password of the **Keycloak** `admin` account in the `master` realm so that no external person can access the Keycloak console.\
Note that the `admin` user in the Keycloak `master` realm is different from the `admin` user in the `Misarch` realm as the first one can manage any permission within Keycloak while the second one can modify any content within the platform itself.
