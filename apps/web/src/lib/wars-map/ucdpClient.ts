const BASE_URL = 'https://ucdpapi.pcr.uu.se/api';

export type UcdpResource =
  | 'gedevents'
  | 'ucdpprioconflict'
  | 'dyadic'
  | 'nonstate'
  | 'onesided'
  | 'battledeaths';

export interface UcdpRequestParams {
  [key: string]: string | number | undefined;
}

export interface UcdpPagedResponse<T> {
  TotalCount: number;
  TotalPages: number;
  PreviousPageUrl: string | null;
  NextPageUrl: string | null;
  Result: T[];
}

export interface UcdpRequestOptions {
  resource: UcdpResource;
  version: string;
  params?: UcdpRequestParams;
  page?: number;
  pageSize?: number;
}

export interface UcdpFetchAllOptions<T> extends UcdpRequestOptions {
  maxPages?: number;
  fetcher?: typeof fetch;
}

export function buildUcdpUrl({
  resource,
  version,
  params = {},
  page,
  pageSize,
}: UcdpRequestOptions): string {
  const searchParams = new URLSearchParams();

  if (pageSize) {
    searchParams.set('pagesize', String(pageSize));
  }
  if (typeof page === 'number') {
    searchParams.set('page', String(page));
  }

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'undefined') return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return `${BASE_URL}/${resource}/${version}${query ? `?${query}` : ''}`;
}

export async function fetchUcdpPage<T>(
  options: UcdpRequestOptions,
  fetcher: typeof fetch = fetch
): Promise<UcdpPagedResponse<T>> {
  const url = buildUcdpUrl(options);
  const response = await fetcher(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`UCDP API error (${response.status} ${response.statusText}): ${body}`);
  }

  return (await response.json()) as UcdpPagedResponse<T>;
}

export async function fetchUcdpAllPages<T>({
  resource,
  version,
  params,
  pageSize = 500,
  maxPages,
  fetcher = fetch,
}: UcdpFetchAllOptions<T>): Promise<T[]> {
  const aggregated: T[] = [];
  let currentPage = 0;

  while (true) {
    const pageData = await fetchUcdpPage<T>(
      {
        resource,
        version,
        params,
        page: currentPage,
        pageSize,
      },
      fetcher
    );

    aggregated.push(...pageData.Result);

    const reachedLastPage = !pageData.NextPageUrl || pageData.Result.length === 0;
    const reachedMaxPages = typeof maxPages === 'number' && currentPage + 1 >= maxPages;
    if (reachedLastPage || reachedMaxPages) {
      break;
    }

    currentPage += 1;
  }

  return aggregated;
}

