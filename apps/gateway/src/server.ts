import { ApplicationProvider } from "./main/providers/ApplicationProvider";

import("tsconfig-paths")
  .then(({ register }) => {
    register({
      baseUrl: __dirname,
      paths: {
        "@/*": ["*"],
      },
      addMatchAll: false,
    });
  })
  .then(() => {
    ApplicationProvider();
  });
