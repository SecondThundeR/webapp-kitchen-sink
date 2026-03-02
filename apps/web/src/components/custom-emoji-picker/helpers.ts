interface GetPaginatedItemsOptions<T> {
  items: T[];
  page: number;
  itemsPerPage: number | undefined;
}

export const getPaginatedItems = <T>({
  items,
  page,
  itemsPerPage,
}: GetPaginatedItemsOptions<T>) => {
  if (!itemsPerPage) {
    return {
      currentItems: items,
      totalPages: 1,
    };
  }

  const startIndex = (page - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  return { currentItems, totalPages };
};
