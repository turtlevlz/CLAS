import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/20/solid';

type DirectoryPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function DirectoryPagination({
  currentPage,
  totalPages,
  onPageChange,
}: DirectoryPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  function handleFirstPage() {
    if (currentPage === 1) {
      return;
    }

    onPageChange(1);
  }

  function handlePreviousPage() {
    if (currentPage <= 1) {
      return;
    }

    onPageChange(currentPage - 1);
  }

  function handleNextPage() {
    if (currentPage >= totalPages) {
      return;
    }

    onPageChange(currentPage + 1);
  }

  function handleLastPage() {
    if (currentPage === totalPages) {
      return;
    }

    onPageChange(totalPages);
  }

  function handlePageChange(page: number) {
    if (page === currentPage) {
      return;
    }

    onPageChange(page);
  }

  const firstVisiblePage = Math.max(
    1,
    Math.min(currentPage - 1, totalPages - 2),
  );
  const lastVisiblePage = Math.min(totalPages, firstVisiblePage + 2);
  const pages = Array.from(
    { length: lastVisiblePage - firstVisiblePage + 1 },
    (_, index) => firstVisiblePage + index,
  );

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <nav
      aria-label="Paginación del directorio"
      className="!mt-10 !flex !items-center !justify-center !gap-2"
    >
      <button
        type="button"
        onClick={handleFirstPage}
        disabled={isFirstPage}
        aria-label="Ver primera página"
        className="!flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-[#dbe4ef] !bg-white !text-[#17304f] !transition hover:!bg-[#eef6ff] focus:!outline-none focus:!ring-4 focus:!ring-sky-100 disabled:!cursor-not-allowed disabled:!opacity-45"
      >
        <ChevronDoubleLeftIcon aria-hidden="true" className="!h-5 !w-5" />
      </button>

      <button
        type="button"
        onClick={handlePreviousPage}
        disabled={isFirstPage}
        aria-label="Ver página anterior"
        className="!flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-[#dbe4ef] !bg-white !text-[#17304f] !transition hover:!bg-[#eef6ff] focus:!outline-none focus:!ring-4 focus:!ring-sky-100 disabled:!cursor-not-allowed disabled:!opacity-45"
      >
        <ChevronLeftIcon aria-hidden="true" className="!h-5 !w-5" />
      </button>

      {pages.map((page) => {
        const isCurrentPage = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => handlePageChange(page)}
            aria-label={`Ver página ${page}`}
            aria-current={isCurrentPage ? 'page' : undefined}
            className={[
              '!flex !h-11 !min-w-11 !items-center !justify-center !rounded-full !border !px-4 !text-[15px] !font-bold !transition focus:!outline-none focus:!ring-4 focus:!ring-sky-100',
              isCurrentPage
                ? '!border-[#1390ff] !bg-[#1390ff] !text-white'
                : '!border-[#dbe4ef] !bg-white !text-[#17304f] hover:!bg-[#eef6ff]',
            ].join(' ')}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={handleNextPage}
        disabled={isLastPage}
        aria-label="Ver página siguiente"
        className="!flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-[#dbe4ef] !bg-white !text-[#17304f] !transition hover:!bg-[#eef6ff] focus:!outline-none focus:!ring-4 focus:!ring-sky-100 disabled:!cursor-not-allowed disabled:!opacity-45"
      >
        <ChevronRightIcon aria-hidden="true" className="!h-5 !w-5" />
      </button>

      <button
        type="button"
        onClick={handleLastPage}
        disabled={isLastPage}
        aria-label="Ver última página"
        className="!flex !h-11 !w-11 !items-center !justify-center !rounded-full !border !border-[#dbe4ef] !bg-white !text-[#17304f] !transition hover:!bg-[#eef6ff] focus:!outline-none focus:!ring-4 focus:!ring-sky-100 disabled:!cursor-not-allowed disabled:!opacity-45"
      >
        <ChevronDoubleRightIcon aria-hidden="true" className="!h-5 !w-5" />
      </button>
    </nav>
  );
}