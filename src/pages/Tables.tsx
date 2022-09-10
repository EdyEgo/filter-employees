import HeaderTable from "../components/tablesPage/TablesPageHeader";
import ContentTable from "../components/tablesPage/tablesPageContent";
interface TablesPageProps {}

const TablesPage: React.FC<TablesPageProps> = () => {
  return (
    <div className="tables-page-container">
      <HeaderTable />
      <ContentTable />
    </div>
  );
};

export default TablesPage;
