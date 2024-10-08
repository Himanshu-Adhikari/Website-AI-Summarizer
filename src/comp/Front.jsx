import { logo } from "../assets";
const Front = () => {
  return (
    <header className="w-full flex justify-center items-center flex-col">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />

        <button
          type="button"
          onClick={() => window.open("https://github.com/Himanshu-Adhikari/")}
          className="black_btn"
        >
          Github
        </button>
      </nav>

      <h1 className="head_text">Sumamrize Articles with <br className="max-md:hidden"/> <span className="orange_gradient">OPEN AI </span></h1>
      <h2 className="desc">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi laudantium nemo aliquid nihil. Accusantium recusandae iste magni quidem voluptas dolore hic distinctio eligendi.</h2>
    </header>
  );
};

export default Front;
