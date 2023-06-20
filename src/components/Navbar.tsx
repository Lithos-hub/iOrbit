const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full text-white bg-black/10 backdrop-blur z-50 flex justify-between p-5">
      <div className="logo">
        <h1>My Solar System</h1>
      </div>

      <div className="flex gap-5">
        <div className="links">option 1</div>
        <div className="links">option 2</div>
        <div className="links">option 3</div>
      </div>
    </nav>
  );
};

export default Navbar;
