import Hero1 from "../components/Hero1";
import {Hero2} from "../components/Hero2";
import Donation from "../components/donation/Donation";
import {Projects} from "../components/Projects";

export  function Home() {
  return (
    <div className=" ">
      <Hero1 />
      <Hero2 />
      <Donation />
      <Projects /> 
      
    </div>
  );
}
