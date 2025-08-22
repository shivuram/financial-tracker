interface Props {
  filterType: string;
  setFilterType: (val: string) => void;
  sortOrder: string;
  setSortOrder: (val: string) => void;
  setSearch: (val: string) => void;
}

const TransactionFilters = ({
  filterType,
  setFilterType,
  sortOrder,
  setSortOrder,
  setSearch,
}: Props) => {
  return (
    <>
      <div className="filtering">
        <label htmlFor="filter">Filter By</label>
        <select
          id="filter"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="sort">Sort By</label>
        <select
          id="sort"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">None</option>
          <option value="high">Amount (High → Low)</option>
          <option value="low">Amount (Low → High)</option>
        </select>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />
    </>
  );
};

export default TransactionFilters;
