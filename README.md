## Getting Started

To run the project, follow these steps:

1. Install dependencies:

   ```bash
   pnpm i
   ```

2. Start the development server:
   ```bash
   pnpm run dev
   ```

### Project Highlights

### Key Contributions and Code Highlights

#### 1. Custom Component Development

- **Video Review Module**: Built comprehensive components such as VideoCard and VideosCarousel with features like click handlers that log interactions and send analytics data to the backend.
- **Filtering System**: Developed FilterDropdown and ShadesDropdown components to enable users to filter video reviews by attributes such as shades, skin tones, and undertones.
- **Active Filters Display**: Implemented an ActiveFilters component that shows selected filters and allows for quick removal, enhancing user control.

#### 2. Robust API and Backend Integration

- **RESTful API Endpoints**: Created endpoints for fetching relevant data, including /api/reviews, /api/products/[productId]/users, and /api/products/[productId]/shades.
- **Event Logging API**: Developed /api/events endpoint for capturing user interactions, sending detailed event data like reviewId and productId to the backend for analytics.

#### 3. Database Schema Design

- **Type-Safe Schema**: Leveraged Drizzle ORM to design a scalable schema for Users, Products, Shades, Reviews, and Events, ensuring strong type safety and maintainability.
- **Enums for Consistency**: Used PostgreSQL enums (e.g., eventTypeEnum) to standardize event types, ensuring reliable data handling.

#### 4. Event Handling and Analytics Integration

- **Interaction Tracking**: Implemented event handlers in the VideoCard component to log the contents of interactions and emit events to the backend, enabling real-time tracking and analysis.
- **Comprehensive Metadata**: Emitted events included relevant user and product data to facilitate robust analytics.

#### 5. Custom Hooks for Enhanced Functionality

- **useFilterParams Hook**: Created a custom hook to manage and synchronize URL search parameters for filtering, providing a better user experience and consistent state management.

#### 6. Dynamic Styling (Supporting Feature)

- **Configurable Styling**: Integrated a configuration object that applies global CSS variables for runtime UI updates, enhancing the flexibility of the user interface.
- **Tailwind Integration**: Extended tailwind.config.js to support CSS variables, allowing for custom properties to be used seamlessly with utility classes.

# Next Improvements

## Potential speed improvements

- **Lazy Load Components**: Implement lazy loading for components like VideosCarousel to boost initial load times and make the app feel snappier.
- **Cache API Responses**: Add server-side caching to speed up repeated data requests and reduce server load.

## Better Error Handling

- **Clear Error Messages**: Improve API error handling so users get helpful, friendly notifications when something goes wrong.

## Refine the Code Structure

- **Smaller Components**: Break down larger components into smaller, easier-to-maintain pieces.

## Enhance User Experience

- **Loading Indicators**: Add spinners or skeleton loaders to keep users engaged while waiting for content.

## Simplify State Management

- **Centralize State**: Consider a global state management tool like Zustand or Redux if the app starts handling more complex interactions.
- **Streamline State Logic**: Review state handling to reduce duplication and make logic clearer.

## Improve Testing Coverage

- **More Unit and Integration Tests**: Expand the current test suite to catch more edge cases using Jest and React Testing Library.
- **End-to-End Tests**: Introduce tests with Cypress or Playwright to simulate real user interactions and ensure the full app works as expected.

## Strengthen Type Safety

- **Tighter TypeScript Typing**: Refactor areas where type definitions could be stricter to catch potential issues earlier.

## Plan for Growth

- **Pagination**: Add pagination or infinite scrolling to handle larger data sets without slowing down the UI.
- **Optimize Database**: Ensure database queries run efficiently by adding indexes where needed.

## Enhance Security

- **Rate Limiting**: Implement rate limiting on APIs to protect against potential abuse.
