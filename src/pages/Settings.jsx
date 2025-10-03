import Sidebar from "../components/Sidebar";

const Settings = () => {
  return (
    <div className="app-layout">
      <Sidebar activeItem="settings" />
      <div className="main-content" style={{ padding: "2rem 4rem" }}>
        <h1>Settings</h1>
      </div>
    </div>
  );
};

export default Settings;
