import { FrownIcon } from "lucide-react";
import { type ChangeEventHandler, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { isVersionAtLeastFilter } from "@/utils/array";
import { HANDLERS_MAPPING } from "./constants";

export const HandlersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQueryData = searchParams.get("q");

  const filteredHandlersByVersion = useMemo(
    () => HANDLERS_MAPPING.filter(isVersionAtLeastFilter),
    [],
  );

  const filteredHandlersMapping = useMemo(() => {
    if (!searchQueryData) return filteredHandlersByVersion;

    return filteredHandlersByVersion.filter(({ name }) =>
      name.toLocaleLowerCase().includes(searchQueryData.toLocaleLowerCase()),
    );
  }, [searchQueryData, filteredHandlersByVersion]);

  const handleSearchParamsUpdate: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const value = event.currentTarget.value;
    if (!value) {
      searchParams.delete("q");
      setSearchParams(searchParams);
    } else {
      searchParams.set("q", value);
      setSearchParams(searchParams);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Handlers Playground
      </h1>
      <Input
        name="searchQuery"
        placeholder="Enter search query"
        className="sticky top-0 bg-background dark:bg-background mb-2"
        defaultValue={searchQueryData ?? undefined}
        onChange={handleSearchParamsUpdate}
      />
      {filteredHandlersMapping.length === 0 ? (
        <Empty className="h-full">
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

// WebApp.isVerticalSwipesEnabled;
