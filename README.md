# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

```mermaid
flowchart LR
  %% Apps (frontends)
  subgraph APPS[App Layer (Frontends)]
    A1[Microsite]
    A2[Startup Equity]
    A3[OKR Planner]
    A4[Matchmaking]
    A5[Admin]
  end

  %% Shared packages (code libs in mono-repo)
  subgraph PKG[Shared Packages]
    P1[Auth Package (OAuth/JWT)]
    P2[RBAC Package (policy)]
    P3[API Client (typed)]
    P4[DB Schema (Drizzle/Prisma)]
    P5[UI/Utils]
  end

  %% Backend core
  subgraph CORE[Backend Core]
    G[API Gateway]
    M[Middleware (Auth -> RBAC -> Validation)]
    S1[User Service]
    S2[Project Service]
    S3[Integrations Service\n(Forecast, OnePager, HubSpot)]
    S4[Payments Service]
    S5[Admin Service]
  end

  %% External systems
  subgraph EXT[External Services]
    E1[Forecast Engine]
    E2[One-Pager Engine]
    E3[HubSpot CRM]
    E4[Payment Provider]
  end

  %% Data stores & obs
  D[(PostgreSQL)]
  O[(Observability: Logs/Metrics/Traces)]
  ST[(Object Storage: PDFs/Exports)]

  %% App calls
  A1-->G
  A2-->G
  A3-->G
  A4-->G
  A5-->G

  %% Gateway pipeline
  G-->M
  M-->S1
  M-->S2
  M-->S3
  M-->S4
  M-->S5

  %% Services to data
  S1-->D
  S2-->D
  S3-->D
  S4-->D
  S5-->D
  S3-->ST

  %% Integrations
  S3-->E1
  S3-->E2
  S3-->E3
  S4-->E4
  E4-->G  %% webhooks

  %% Observability taps
  G-->O
  S1-->O
  S2-->O
  S3-->O
  S4-->O
  S5-->O
Legend
Auth Flow: App → Gateway (Auth Middleware) → Services. The packages/auth module is used by the gateway to issue and validate JWTs.
RBAC: Policy is applied at the gateway middleware after authentication.
Tenancy: All private requests carry userId, projectId, and a requestId for logging and multi-tenant safety.
Webhooks: Payment provider webhooks hit POST /api/payments/webhook at the gateway.
Public Routes: Marketing pages, login.
Private Routes: All tools, admin dashboard.
```
