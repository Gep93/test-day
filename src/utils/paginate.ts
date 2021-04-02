import _ from "lodash";

export default function paginate(
  items: Array<any>,
  pageNumber: number,
  pageSize: number
) {
  const startIndex = pageNumber * pageSize;

  return _(items).slice(startIndex).take(pageSize).value();
}

export function paginationItemIndex(
  index: number,
  selectedPage: number
): number {
  return selectedPage * 10 + index;
}
