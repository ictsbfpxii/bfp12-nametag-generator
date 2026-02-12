import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { QRCodeCanvas } from "qrcode.react";
import { toTitleCase } from "../data/FormData";
import domtoimage from "dom-to-image";
import { useNametag } from "../context/NametagContext";
import NametagSkeleton from "./NametagSkeleton";
import { ranks } from "../data/FormData";

function Preview() {
  //CONTEXT STATE
  const { state, dispatch } = useNametag();
  const { savedNametag, isSaving, isDownloading } = state;
  //CONTEXT STATE

  const currentRank = ranks.find((r) => r.rank === savedNametag?.rank);
  const isOfficer = currentRank?.isOfficer || false;

  const rank = savedNametag?.rank.toUpperCase() || "";
  const firstName = toTitleCase(savedNametag?.firstName || "");
  const middleInitial = savedNametag?.middleInitial.toUpperCase() || "";
  const lastName = toTitleCase(savedNametag?.lastName || "");

  const fullName = savedNametag
    ? `${rank} ${firstName} ${middleInitial} ${lastName}`
    : "No Name";
  const handleDownload = async () => {
    dispatch({ type: "DOWNLOAD_NAMETAG" });
    setTimeout(async () => {
      const element = document.getElementById("nametag-to-print");

      if (!element) return;

      try {
        const dataUrl = await domtoimage.toPng(element, {
          quality: 1,
          bgcolor: "white",
          // Sometimes you need to manually scale the node for higher res
          width: element.offsetWidth * 4,
          height: element.offsetHeight * 4,
          style: {
            transform: "scale(4)",
            transformOrigin: "top left",
            width: element.offsetWidth + "px",
            height: element.offsetHeight + "px",
          },
        });

        const link = document.createElement("a");
        link.download = `${fullName}-Nametag-${savedNametag?.office || "BFP"}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("oops, something went wrong!", error);
      } finally {
        dispatch({ type: "FINISHED_DOWNLOAD_NAMETAG" });
      }
    }, 2000);
  };
  return (
    <Stack
      direction="column"
      gap={2}
      boxShadow={5}
      sx={{ borderRadius: "10px", width: "600px", height: "675px" }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          height: "55px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          color: "white",
          alignContent: "center",
          fontFamily: "Roboto",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        PREVIEW
      </Box>
      {/* Outer Box  */}
      <Box
        width="100%"
        display="flex"
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        {/* Nametag Layout */}
        <Box
          width="350px"
          height="500px"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Header Box  */}
          {isSaving ? (
            <NametagSkeleton />
          ) : (
            <Stack
              id="nametag-to-print"
              direction="column"
              sx={{ width: "350px", height: "500px" }}
            >
              <Stack
                direction="row"
                sx={{
                  width: "100%",
                  height: "102px",
                  backgroundColor: "#ec1d25",
                  position: "relative",
                }}
              >
                <Box
                  width="20%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="right"
                  position="relative"
                  top={"-7px"}
                >
                  <img src="dilg.png" width="52px" />
                </Box>
                <Box width="72%" height="100%" textAlign="center" padding={0.5}>
                  <Typography
                    sx={{
                      fontSize: "10.44px",
                      fontFamily: "Roboto",
                      fontWeight: 700,
                      color: "black",
                      textAlign: "center",
                      WebkitTextStroke: "2px white",
                      paintOrder: "stroke fill",
                    }}
                    boxShadow="10px"
                  >
                    Republic of the Philippines
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "10.44px",
                      fontFamily: "Roboto",
                      fontWeight: 750,
                      color: "black",
                      textAlign: "center",
                      WebkitTextStroke: "2px white",
                      paintOrder: "stroke fill",
                    }}
                    boxShadow="10px"
                  >
                    Department of Interior and Local Government
                  </Typography>

                  <Box
                    component="img"
                    src="nametagheader-stations.png"
                    width="100%"
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      width: "270px",
                      left: "40px",
                      bottom: "0",
                      height: "25px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "10px",
                        fontFamily: "Roboto Condensed",
                        fontWeight: 750,
                        color: "black",
                        textAlign: "center",
                        WebkitTextStroke: "3px white",
                        paintOrder: "stroke fill",
                        filter: "drop-shadow(0px 0px 3px rgba(0, 0, 0, 0.21))",
                        transform: "scaleX(0.95)",
                        transformOrigin: "center",
                      }}
                      lineHeight={1}
                    >
                      {toTitleCase(savedNametag?.stationProvinceAddress || "")}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  width="20%"
                  height="100%"
                  display="flex"
                  alignItems="center"
                  justifyContent="left"
                  position="relative"
                  top={"-7px"}
                >
                  <img src="bfp.png" width="52px" />
                </Box>
              </Stack>
              <Box
                display="flex"
                sx={{
                  width: "100%",
                  height: "43px",
                  backgroundColor: "#f2f2ea",
                  color: "black",
                  fontFamily: "Roboto Condensed",
                  fontWeight: 900,
                }}
                alignItems="center"
                justifyContent="center"
              >
                <Box
                  display="flex"
                  lineHeight={1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "98%",
                    textAlign: "center",
                    fontSize: "17.5px",
                    letterSpacing: "0.7px",
                    transform: "scaleX(0.95)",
                    transformOrigin: "center",
                    WebkitTextStroke: "0.3px black",
                    color: "black",
                  }}
                >
                  {savedNametag?.office.toLocaleUpperCase() || "NO OFFICE NAME"}
                </Box>
              </Box>
              <Stack
                direction="row"
                sx={{
                  backgroundColor: "#ec1d25",
                  width: "100%",
                  height: "155px",
                }}
              >
                <Box sx={{ width: "100%", padding: "12px" }}>
                  <Stack direction="column" sx={{ height: "100%" }}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      width={"100%"}
                      height={"100%"}
                    >
                      {/* QR CODE */}
                      <Box
                        sx={{
                          width: "85px",
                          height: "85px",
                          backgroundColor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {savedNametag ? (
                          <QRCodeCanvas
                            value={savedNametag.accountNumber.toLocaleUpperCase()}
                            bgColor="#fff"
                            fgColor="#000"
                            level="H"
                            size={73}
                          />
                        ) : (
                          <Box component="img" src="qrcode-placeholder.png" />
                        )}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        height: "25px",
                        paddingLeft: "3px",
                        marginBottom: "5px",
                        backgroundColor: "#f2f2ea",
                      }}
                    >
                      <Box
                        component="img"
                        src="emp-id.png"
                        sx={{ height: "17px" }}
                      />
                      <Typography
                        style={{
                          textAlign: "center",
                          fontFamily: "Roboto",
                          fontWeight: 900,
                          fontSize: "17px",
                          marginTop: "2px",
                          letterSpacing: "3px",
                          transform: "scaleX(0.90)",
                        }}
                        className="arial-narrow-black-alt extra-bold"
                      >
                        {savedNametag?.accountNumber.toLocaleUpperCase()}
                        {/* P24161 */}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    padding: "12px",
                    paddingTop: "7px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* ID PHOTO */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "126px",
                      height: "126px",
                    }}
                  >
                    {/* ID BACKGROUND */}
                    <Box
                      component="img"
                      src="picturebackground2.png"
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        objectFit: "cover",
                      }}
                    />
                    {savedNametag && (
                      <Box
                        component="img"
                        src={savedNametag?.photo || ""}
                        alt="ID Photo"
                        sx={{
                          position: "absolute",
                          zIndex: 1,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover", // Ensures no stretching
                        }}
                      />
                    )}
                  </Box>
                </Box>
              </Stack>
              <Stack
                direction={"column"}
                sx={{
                  width: "100%",
                  height: "148px",
                  backgroundColor: "#f2f2ea",
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    paddingTop: "8px",
                  }}
                >
                  <img src="Hello.png" style={{ width: "128px" }} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    position: "relative",
                    justifyContent: "center",

                    width: "100%",
                  }}
                >
                  <Typography
                    className="arial-narrow-black-alt extra-bold"
                    sx={{
                      position: "absolute",
                      fontFamily: "Roboto Condensed",
                      fontWeight: 900,
                      fontSize: "65px",
                      top: "-15px",
                      letterSpacing: "0px",
                      transform: "scaleX(0.82)",
                      transformOrigin: "center",
                    }}
                  >
                    {savedNametag?.nickname.toLocaleUpperCase() || "NICKNAME"}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    container: "inline-size",
                    justifyContent: "center",
                    width: "100%",
                    height: "32px",
                    position: "absolute",
                    bottom: "0px",
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Roboto Condensed",
                      fontWeight: 700,
                      fontSize: "17.8px",
                      letterSpacing: "0px",
                      transform: "scaleX(0.95)",
                      transformOrigin: "center",
                    }}
                  >
                    {isOfficer ? fullName.toLocaleUpperCase() : fullName}
                  </Typography>
                </Box>
                <img
                  src="boy-bfp.png"
                  style={{
                    width: "100px",
                    position: "absolute",
                    top: "-8px",
                    left: "-3px",
                    filter: "drop-shadow(-1px 2px 2px rgb(0, 0, 0))",
                  }}
                />
              </Stack>
              <Box
                sx={{
                  width: "100%",
                  height: "52px",
                  backgroundColor: "#ec1d25",
                }}
              >
                <Box
                  display="flex"
                  lineHeight={1.1}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: "100%",
                    height: "100%",
                    textAlign: "center",
                    fontSize: "15px",
                    letterSpacing: "1.4px",
                    paddingX: "8px",
                    WebkitTextStroke: "1.2px white",
                    color: "white",
                  }}
                >
                  {/* FIRE SAFETY ENFORCEMENT SECTION */}
                  {savedNametag?.sectionDivision.toLocaleUpperCase() ||
                    "NO SECTION/DIVISION"}
                </Box>
              </Box>
            </Stack>
          )}
        </Box>
        <Box width={"100%"} sx={{ paddingX: "28px", paddingTop: "20px" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ height: "45px" }}
            startIcon={
              isDownloading ? (
                <CircularProgress color="inherit" size={15} />
              ) : (
                <DownloadIcon />
              )
            }
            disabled={savedNametag === null || isDownloading}
            onClick={handleDownload}
          >
            {isDownloading ? "DOWNLOADING..." : "DOWNLOAD"}
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}

export default Preview;
