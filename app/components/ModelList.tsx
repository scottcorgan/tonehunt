import Button from "~/components/ui/Button";
import ModelListItem from "./ModelListItem";
import ReactPaginate from "react-paginate";
import Select from "./ui/Select";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const ModelsListComponent = ({
  data = [],
  total = 0,
  currentPage = 0,
  limit,
  handlePageClick,
  filterOptions = [],
  selectedFilter = null,
  setSelectedFilter = null,
  showFilters = true,
  showMenu = true,
}: any) => {
  const pageCount = Math.ceil(total / limit);
  const paginationButtonLinkStyle = "px-3 py-1 border border-gray-600 rounded-lg relative";

  return (
    <div>
      <div className="flex">
        {/* SORT AREA */}
        {showMenu ? (
          <div className="flex-none items-center">
            <div className="flex items-center mt-4">
              <Button type="button" variant="link" className="mr-8">
                NEWEST
              </Button>
              <Button type="button" variant="link" className="mr-8">
                POPULAR
              </Button>
              <Button type="button" variant="link" className="hidden md:block mr-8">
                MY FAVORITES
              </Button>
              <Button type="button" variant="link" className="hidden md:block mr-8">
                MY MODELS
              </Button>
            </div>
          </div>
        ) : null}

        {/* CATEGORIES AREA */}
        {showFilters ? (
          <div className="flex-grow">
            <div className="flex justify-end">
              <Select
                className="w-32"
                options={filterOptions}
                onChange={setSelectedFilter}
                defaultSelected={selectedFilter}
                showEmptyOption={false}
              />
            </div>
          </div>
        ) : null}
      </div>

      {/* MODELS LIST */}
      <div className="flex flex-col">
        {data.length === 0 ? <span>No results</span> : null}
        {data.length > 0 ? data.map((model: any) => <ModelListItem key={model.id} model={model} />) : null}
      </div>
      {/* PAGINATION AREA */}
      <div className="flex mt-5">
        <div className="flex-1">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ChevronRightIcon className="w-4 h-4 absolute inline left-1.5 top-1/2 -translate-y-1/2" />}
            onPageChange={(event) => handlePageClick(event.selected)}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ChevronLeftIcon className="w-4 h-4 absolute inline right-1.5 top-1/2 -translate-y-1/2" />}
            renderOnZeroPageCount={() => {}}
            forcePage={currentPage}
            containerClassName="flex flex-row justify-end"
            pageClassName="mx-1"
            pageLinkClassName={paginationButtonLinkStyle}
            previousClassName="mr-1"
            previousLinkClassName={paginationButtonLinkStyle}
            activeClassName="text-black bg-white rounded-lg"
            nextClassName="ml-1"
            nextLinkClassName={paginationButtonLinkStyle}
            disabledClassName="text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default ModelsListComponent;
