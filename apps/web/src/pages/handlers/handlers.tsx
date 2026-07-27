import { FrownIcon, XIcon } from "lucide-react";
import { useDeferredValue, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { WebApp } from "@/lib/web-app";
import { isVersionAtLeastFilter } from "@/lib/web-app-version";
import { HANDLERS_MAPPING } from "./constants";

const SEARCH_DEBOUNCE_MS = 300;

// A ?q= already in the URL wins; otherwise a deeplink such as
// ?startapp=close arrives as start_param and seeds the box
const getInitialQuery = (searchParams: URLSearchParams) => {
  const fromUrl = searchParams.get("q");
  if (fromUrl) return fromUrl;

  const startParam = WebApp.initDataUnsafe.start_param;

  return startParam ? startParam.replace(/_/g, " ") : "";
};

export const HandlersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(() => getInitialQuery(searchParams));
  // Filtering re-renders every handler card, and each one is a whole form, so
  // the list is allowed to lag a keystroke behind the input
  const deferredQuery = useDeferredValue(query);

  // The URL only has to end up matching, not track each keystroke. Comparing
  // first is what stops this from re-running on the searchParams it just wrote
  useEffect(() => {
    if ((searchParams.get("q") ?? "") === query) return;

    const timeout = setTimeout(() => {
      setSearchParams(
        (prev) => {
          if (query) {
            prev.set("q", query);
          } else {
            prev.delete("q");
          }
          return prev;
        },
        { replace: true },
      );
    }, SEARCH_DEBOUNCE_MS);

    return () => clearTimeout(timeout);
  }, [query, searchParams, setSearchParams]);

  const filteredHandlersByVersion = HANDLERS_MAPPING.filter(
    isVersionAtLeastFilter,
  );
  const filteredHandlersMapping = deferredQuery
    ? filteredHandlersByVersion.filter(({ name }) =>
        name.toLocaleLowerCase().includes(deferredQuery.toLocaleLowerCase()),
      )
    : filteredHandlersByVersion;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Handlers Playground
      </h1>
      <InputGroup className="sticky top-[calc(var(--tg-content-safe-area-inset-top,0px)+var(--tg-safe-area-inset-top,0px)+8px)] bg-background dark:bg-background z-10 mb-2">
        <InputGroupInput
          name="searchQuery"
          placeholder="Enter search query"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
        {query && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Clear"
              title="Clear"
              size="icon-xs"
              onClick={() => setQuery("")}
            >
              {<XIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
      {filteredHandlersMapping.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FrownIcon />
            </EmptyMedia>
            <EmptyTitle>No handlers found</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        filteredHandlersMapping.map(({ name, Component }) => (
          <Component key={name} />
        ))
      )}
    </div>
  );
};
