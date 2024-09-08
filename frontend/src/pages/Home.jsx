import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Sidebar />
      {/* Pushing the page to right-side */}
      <div className="ml-[80px]">
        <Main />
      </div>
    </>
  );
};

export default Home;
