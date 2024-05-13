import Banner from "../../containers/Banner";
import PromotedContent from "../../containers/Promise";
import './style.css'
function Home() {
  return (
    <>
      <main>
        <PromotedContent />
        <Banner />
      </main>
    </>
  );
}
export default Home;
