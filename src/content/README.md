# Portfolio content architecture

The public UI receives all editable content through one flow:

1. `src/data/*` contains the current local records.
2. `localPortfolioContent.js` normalizes every collection for admin use.
3. `portfolioRepository.js` is the only server-side content gateway.
4. `PortfolioContentProvider` supplies the result to public components.

Every collection record is normalized with:

- `id`: stable string identifier
- `sortOrder`: display order
- `isPublished`: public visibility

When a database-backed admin dashboard is added, keep the returned object shape
from `getPortfolioContent()` unchanged. Replace the local reads inside the
repository with database queries. Public design components should not need to
change.
