import { Banner } from '../Components/Banner/Banner';
import Footer from '../Components/Footer/Footer';
import { MovieRow } from '../Components/MovieRow/MovieRow';
import Navbar from '../Components/Navbar/Navbar';



function App() {
  return (
    <div className="App">
      <Navbar/>
      <Banner/>
      <MovieRow/>
      <Footer/>
    </div>
  );
}

export default App;
