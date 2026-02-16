import { FrownIcon, XIcon } from "lucide-react";
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
import { isVersionAtLeastFilter } from "@/utils/array";
import { HANDLERS_MAPPING } from "./constants";

export const HandlersPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQueryData = searchParams.get("q");
  const filteredHandlersByVersion = HANDLERS_MAPPING.filter(
    isVersionAtLeastFilter,
  );
  const filteredHandlersMapping = searchQueryData
    ? filteredHandlersByVersion.filter(({ name }) =>
        name.toLocaleLowerCase().includes(searchQueryData.toLocaleLowerCase()),
      )
    : filteredHandlersByVersion;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Handlers Playground
      </h1>
      <InputGroup className="sticky top-0 bg-background dark:bg-background z-10 mb-2">
        <InputGroupInput
          name="searchQuery"
          placeholder="Enter search query"
          value={searchQueryData ?? ""}
          onChange={(event) => {
            const value = event.currentTarget.value;
            if (!value) {
              searchParams.delete("q");
              setSearchParams(searchParams, { replace: true });
            } else {
              searchParams.set("q", value);
              setSearchParams(searchParams, { replace: true });
            }
          }}
        />
        {searchQueryData && (
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              aria-label="Clear"
              title="Clear"
              size="icon-xs"
              onClick={() => {
                searchParams.delete("q");
                setSearchParams(searchParams, { replace: true });
              }}
            >
              {<XIcon />}
            </InputGroupButton>
          </InputGroupAddon>
        )}
      </InputGroup>
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
