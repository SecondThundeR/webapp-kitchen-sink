import { useQuery } from "@tanstack/react-query";
import { BugIcon } from "lucide-react";
import { useState } from "react";
import { getTestEmojiSet } from "@/lib/queries";
import { WebApp } from "@/lib/web-app";
import { CustomEmojiGrid } from "../custom-emoji-grid";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { Spinner } from "../ui/spinner";
import { getPaginatedItems } from "./helpers";

const isUserPremium = WebApp.initDataUnsafe.user?.is_premium ?? false;

interface CustomEmojiPickerProps {
  value: string | undefined;
  onChange: (value: string) => void;
  paginationConfig?: {
    itemsPerPage: number;
  };
}

export const CustomEmojiPicker = ({
  value,
  onChange,
  paginationConfig,
}: CustomEmojiPickerProps) => {
  const { itemsPerPage } = paginationConfig ?? {};

  const [page, setPage] = useState(1);
  const { data, isPending, error } = useQuery({
    queryKey: ["getTestEmojiSet"],
    queryFn: () => getTestEmojiSet(),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: isUserPremium,
  });

  if (isPending)
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <Spinner className="size-8" />
        <p className="leading-7 mt-3">Loading custom emojis</p>
      </div>
    );

  if (error) {
    return (
      <Empty className="flex-1">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BugIcon />
          </EmptyMedia>
          <EmptyTitle>Failed to load custom emojis</EmptyTitle>
          <EmptyDescription>{error.message}</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const { currentItems, totalPages } = getPaginatedItems({
    items: data.emojis,
    page,
    itemsPerPage,
  });

  return (
    <div className="flex flex-col gap-4">
      <CustomEmojiGrid
        emojis={currentItems}
        currentEmojiId={value}
        onClick={(id) => onChange(id)}
      />
      {itemsPerPage !== undefined && (
        <Pagination>
          <PaginationContent>
            {new Array(totalPages).fill(null).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: It is fine here
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
