# Customer Application

This mobile application was developed using Ionic 2 and allows customers to access their digital loyalty memberships.

# Setup
1. Install global dependencies with the command **npm install -g ionic cordova**
2. Install project dependencies with the command **npm install** in the project root.

# Running
To run a development version of the project in the browser run the command **ionic serve**

To run a development version on a simulated iOS device run the command **ionic serve ios**

To run a development version on a real iOS device. Attach the device to your computer via cable and run the script ./dev.sh.
You may be prompted to select an IP address. Choose the one corresponding to the your iOS device. This development version also facilitates live reloads to code changes.

To build a production version run the command **ionic run ios --device**.

For any application signing issues refer to this page [Ionic iOS Deployment](https://ionicframework.com/docs/intro/deploying/)

# Note
Requires two LaaS-01-Backend servers running. The URL for the two different servers can be specified in /src/providers/account-service.ts.
Firebase config found in app.module.ts is not used. Errors related to it can be simply quelled by adding the config info of a working firebase instance.
