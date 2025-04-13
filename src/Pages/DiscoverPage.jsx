import { useIsMobile } from "../hooks/use-mobile";
import Header from "../components/discover_components/Header";
import TabNavigation from "../components/discover_components/TabNavigation";
import MainLayout from "../components/MainLayout";
import ContentView from "../components/discover_components/ContentView";
import { tabs } from "../components/discover_components/data/tabs-data";
import { useState } from "react";

const DiscoverPage = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState("Restaurants");

  return (
    <MainLayout rs={false}>
      <Header />
      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      <ContentView activeTab={activeTab} />
    </MainLayout>
  );
};

export default DiscoverPage;
