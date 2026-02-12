import { Button } from "@mui/material";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

function NavBar() {
  return (
    <nav
      className="flex flex-row justify-between fixed top-0 w-full h-16 bg-red-600 z-50 shadow-md"
      style={{ boxShadow: "0px 2px 3px #0000008c" }}
    >
      <div className="flex flex-row items-center">
        <div className="flex w-20 h-full items-center justify-center">
          <img src="id-card.png" className="text-center w-10" />
        </div>
        <div className="flex flex-col h-full items-center justify-center pb-1 ">
          <h1 className="font-black w-full text-xl text-white">
            BFP-12 Nametag Generator
          </h1>
          <hr className="border-t-2 border-white-500 w-full color-white" />
          <p className="text-xs w-full text-white">
            Bureau of Fire Protection 12 Nametag Generator
          </p>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center w-50">
        <Button
          variant="contained"
          startIcon={<OndemandVideoIcon />}
          size="small"
          sx={{ backgroundColor: "black" }}
        >
          see tutorial
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
