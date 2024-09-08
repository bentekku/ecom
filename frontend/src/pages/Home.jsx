import Main from "../components/Main";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <>
      <Sidebar />
      <div className="ml-[80px]">
        <Main />
      </div>
    </>
  );
};

export default Home;
