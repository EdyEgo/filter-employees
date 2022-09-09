interface TablesPageProps {}

const TablesPage: React.FC<TablesPageProps> = () => {
  return (
    <div className="tables-page-container">
      <div className="filter-by-header-container"></div>
      <div className="content-table-result-list-container"></div>
    </div>
  );
};

export default TablesPage;
