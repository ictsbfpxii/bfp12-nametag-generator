import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import {
  Box,
  Button,
  MenuItem,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import Cropper from "react-easy-crop";
import { useCallback, useEffect, useState } from "react";
import { ranks, offices } from "../data/FormData";
import getCroppedImg from "../data/cropImageHelper";
import { type Point } from "../types/Types";
import { type Area } from "react-easy-crop";
import { VisuallyHiddenInput } from "../data/VisuallyHiddenInput";
import { removeBackgroundLocal } from "../data/removeBgLocal";
import { sections } from "../data/FormData";
import Alert from "./Alert";
import { type AlertMessage } from "../types/Types";
import { useNametag } from "../context/NametagContext";

function Form() {
  //NAMETAG CONTEXT STATE
  const { state, dispatch } = useNametag();
  const {
    selectedPhoto,
    preview,
    accountNumber,
    rank,
    firstName,
    lastName,
    middleInitial,
    nickname,
    office,
    sectionDivision,
    stationProvinceAddress,
    photo,
    isEditingPhoto,
    hasSaved,
    hasSubmitted,
    isProcessing,
    isBackgroundRemoved,
    openAlert,
    alertMessage,
  } = state;
  //NAMETAG CONTEXT STATE

  //FOR CROPPER
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedResult, setCroppedResult] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  //FOR CROPPER

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      dispatch({ type: "EDIT_PHOTO" });
      dispatch({ type: "SET_SELECTED_PHOTO", payload: file });
      dispatch({ type: "TURN_OFF_REMOVED_PHOTO_BACKGROUND" });
      dispatch({ type: "SET_PHOTO_PREVIEW", payload: photo });
    }
  };

  const handleClickOpenAlert = (alertMessage: AlertMessage) => {
    dispatch({ type: "OPEN_ALERT" });
    dispatch({
      type: "SET_ALERT_MESSAGE",
      payload: {
        title: alertMessage.title,
        message: alertMessage.message,
      },
    });
  };
  const handleCloseAlert = () => {
    dispatch({ type: "CLOSE_ALERT" });
  };

  const onCropChange = (crop: Point) => {
    setCrop(crop);
  };

  const roundZoom = (val: number) => {
    return Number(val.toFixed(3));
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(roundZoom(newZoom));
  };

  const ASPECT_RATIO = 1;

  useEffect(() => {
    if (!selectedPhoto) {
      dispatch({ type: "REMOVE_PHOTO_PREVIEW" });
      return;
    }

    const objectUrl = URL.createObjectURL(selectedPhoto);
    dispatch({ type: "SET_PHOTO_PREVIEW", payload: objectUrl });

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedPhoto]);

  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  const handleConfirm = async () => {
    if (preview && croppedAreaPixels) {
      try {
        const croppedImage = await getCroppedImg(preview, croppedAreaPixels);
        dispatch({ type: "SET_PHOTO", payload: croppedImage });
        setCroppedResult(croppedImage);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch({ type: "TURN_OFF_EDIT_PHOTO" });
      }
    }
  };

  const handleEdit = () => {
    dispatch({ type: "EDIT_PHOTO" });
  };

  const handleEditDetails = () => {
    dispatch({ type: "TURN_OFF_HAS_SAVED_NAMETAG" });
  };

  const handleCancel = () => {
    if (!photo) {
      dispatch({ type: "REMOVE_SELECTED_PHOTO" });
      dispatch({ type: "TURN_OFF_EDIT_PHOTO" });
      dispatch({ type: "TURN_OFF_REMOVED_PHOTO_BACKGROUND" });
      dispatch({ type: "REMOVE_PHOTO_PREVIEW" });
    } else {
      dispatch({ type: "SET_PHOTO_PREVIEW", payload: photo });

      dispatch({ type: "TURN_OFF_EDIT_PHOTO" });
    }
  };

  const handleRemoveBG = async () => {
    if (!preview) return;

    dispatch({ type: "REMOVING_BACKGROUND" });

    try {
      console.log("Starting AI Background Removal...");

      const transparentImageUrl = await removeBackgroundLocal(preview);

      console.log("Done!");

      dispatch({ type: "SET_PHOTO_PREVIEW", payload: transparentImageUrl });

      dispatch({ type: "HAS_REMOVED_PHOTO_BACKGROUND" });
    } catch (e) {
      console.error("AI Error:", e);
      alert("Failed to remove background.");
    } finally {
      dispatch({ type: "FINISHED_REMOVING_BACKGROUND" });
    }
  };

  const handleSave = () => {
    dispatch({ type: "HAS_SUBMITTED_FORM" });
    if (
      !accountNumber ||
      !rank ||
      !firstName ||
      !lastName ||
      !middleInitial ||
      !nickname ||
      !sectionDivision ||
      !stationProvinceAddress
    ) {
      handleClickOpenAlert({
        title: "Missing Required Fields",
        message:
          "We cannot generate your nametag because some required information is missing. To ensure accuracy, please review the form and complete the mandatory fields",
      });
      return;
    }

    if (!selectedPhoto) {
      handleClickOpenAlert({
        title: "Missing Photo",
        message:
          "We cannot generate your nametag because you have not uploaded a photo. To ensure accuracy, please review the form and upload a photo",
      });
      return;
    }

    if (!photo) {
      handleClickOpenAlert({
        title: "Confirm Photo",
        message: "Please confirm the photo first before saving",
      });
      return;
    }

    if (accountNumber.length !== 6) {
      handleClickOpenAlert({
        title: "Acount Number",
        message: "The account number must be 6 characters long",
      });
      return;
    }

    const Nametag = {
      accountNumber,
      rank,
      firstName,
      lastName,
      middleInitial,
      nickname,
      office,
      sectionDivision,
      stationProvinceAddress,
      photo,
    };

    dispatch({ type: "SAVING_NAMETAG" });
    setTimeout(() => {
      dispatch({ type: "SAVE_NAMETAG", payload: Nametag });
      dispatch({ type: "NOT_SAVING_NAMETAG" });
      dispatch({ type: "HAS_SAVED_NAMETAG" });
    }, 2000);
  };

  const handleClear = () => {
    const fields = [
      "accountNumber",
      "rank",
      "firstName",
      "lastName",
      "middleInitial",
      "nickname",
      "office",
      "sectionDivision",
      "stationProvinceAddress",
    ];

    fields.forEach((field) => {
      localStorage.removeItem(`draft_${field}`);
    });

    dispatch({ type: "CLEAR_FORM" });
  };

  return (
    <Stack
      direction="column"
      gap={2}
      boxShadow={5}
      sx={{ borderRadius: "10px", mb: 5, height: "675px" }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          height: "55px",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          color: "white",
          alignContent: "center",
          fontSize: "17px",
          fontFamily: "Roboto",
          fontWeight: "700",
          pl: 4,
        }}
      >
        PERSONAL INFORMATION
      </Box>
      <Stack direction="row" gap={4} sx={{ p: 4, pt: 2, width: "100%" }}>
        <Box>
          <Stack direction="row" gap={3} sx={{ mb: 1, width: "500px" }}>
            <TextField
              disabled={hasSaved}
              label="Account Number"
              size="small"
              value={accountNumber}
              error={
                (hasSubmitted && accountNumber === "") ||
                (hasSubmitted && accountNumber.length < 6)
              }
              helperText={
                hasSubmitted && accountNumber === ""
                  ? "Required"
                  : "Minumum of 6 characters"
              }
              fullWidth
              onChange={(e) =>
                dispatch({
                  type: "SET_ACCOUNT_NUMBER",
                  payload: e.target.value,
                })
              }
              slotProps={{
                htmlInput: {
                  maxLength: 6,
                  style: { textTransform: "uppercase" }, // Visually forces uppercase while typing
                },
              }}
            />
            <TextField
              id="rank-select"
              disabled={hasSaved}
              size="small"
              select
              label="Select"
              defaultValue=""
              value={rank}
              error={hasSubmitted && rank === ""}
              helperText={
                hasSubmitted && rank === ""
                  ? "Required"
                  : "Please select you rank"
              }
              fullWidth
              onChange={(e) =>
                dispatch({ type: "SET_RANK", payload: e.target.value })
              }
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: { sx: { maxHeight: "300px" } },
                  },
                },
              }}
            >
              {ranks.map((rank) => (
                <MenuItem key={rank.id} value={rank.rank}>
                  {rank.rank}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            <TextField
              disabled={hasSaved}
              label="First Name"
              size="small"
              fullWidth
              error={hasSubmitted && firstName === ""}
              helperText={hasSubmitted && firstName === "" ? "Required" : ""}
              value={firstName}
              onChange={(e) =>
                dispatch({ type: "SET_FIRST_NAME", payload: e.target.value })
              }
              slotProps={{
                htmlInput: {
                  style: { textTransform: "uppercase" }, // Visually forces uppercase while typing
                },
              }}
            />
            <TextField
              label="Last Name"
              size="small"
              disabled={hasSaved}
              fullWidth
              error={hasSubmitted && lastName === ""}
              helperText={hasSubmitted && lastName === "" ? "Required" : ""}
              value={lastName}
              onChange={(e) =>
                dispatch({ type: "SET_LAST_NAME", payload: e.target.value })
              }
              slotProps={{
                htmlInput: {
                  style: { textTransform: "uppercase" }, // Visually forces uppercase while typing
                },
              }}
            />
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 1 }}>
            <TextField
              disabled={hasSaved}
              label="Middle Initial"
              size="small"
              fullWidth
              error={hasSubmitted && middleInitial === ""}
              helperText={
                hasSubmitted && middleInitial === "" ? "Required" : ""
              }
              value={middleInitial}
              onChange={(e) =>
                dispatch({
                  type: "SET_MIDDLE_INITIAL",
                  payload: e.target.value,
                })
              }
              slotProps={{
                htmlInput: {
                  maxLength: 1,
                  style: { textTransform: "uppercase" }, // Visually forces uppercase while typing
                },
              }}
            />
            <TextField
              disabled={hasSaved}
              label="Nickname"
              size="small"
              fullWidth
              error={hasSubmitted && nickname === ""}
              helperText={
                hasSubmitted && nickname === ""
                  ? "Required"
                  : "Maximum of 8 characters"
              }
              value={nickname}
              onChange={(e) =>
                dispatch({ type: "SET_NICKNAME", payload: e.target.value })
              }
              slotProps={{
                htmlInput: {
                  maxLength: 8,
                  style: { textTransform: "uppercase" }, // Visually forces uppercase while typing
                },
              }}
            />
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            <TextField
              disabled={hasSaved}
              id="select-office"
              size="small"
              label="Office/Station"
              select
              defaultValue=""
              fullWidth
              error={hasSubmitted && office === ""}
              helperText={hasSubmitted && office === "" ? "Required" : ""}
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: { sx: { maxHeight: "200px" } },
                  },
                },
              }}
              value={office}
              onChange={(e) =>
                dispatch({ type: "SET_OFFICE", payload: e.target.value })
              }
            >
              {offices.map((office) => (
                <MenuItem key={office.id} value={office.name}>
                  {office.name}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            <TextField
              disabled={hasSaved}
              id="select-office"
              size="small"
              label="Main Section/Division"
              select
              defaultValue=""
              fullWidth
              error={hasSubmitted && sectionDivision === ""}
              helperText={
                hasSubmitted && sectionDivision === "" ? "Required" : ""
              }
              slotProps={{
                select: {
                  MenuProps: {
                    PaperProps: { sx: { maxHeight: "200px" } },
                  },
                },
              }}
              value={sectionDivision}
              onChange={(e) =>
                dispatch({
                  type: "SET_SECTION_OR_DIVISION",
                  payload: e.target.value,
                })
              }
            >
              {sections.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            <TextField
              disabled={hasSaved}
              label="Station/Provincial Office Address"
              size="small"
              fullWidth
              error={hasSubmitted && stationProvinceAddress === ""}
              helperText={
                hasSubmitted && stationProvinceAddress === "" ? "Required" : ""
              }
              value={stationProvinceAddress}
              onChange={(e) =>
                dispatch({
                  type: "SET_STATION_OR_PROVINCE_ADDRESS",
                  payload: e.target.value,
                })
              }
            />
          </Stack>
          <Stack direction="row" gap={3} sx={{ mb: 3 }}>
            {!hasSaved ? (
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                startIcon={<SaveIcon />}
                onClick={handleEditDetails}
              >
                Edit
              </Button>
            )}
            <Alert
              openAlert={openAlert}
              onCloseAlert={handleCloseAlert}
              modalTitle={alertMessage?.title || ""}
            >
              {alertMessage?.message || ""}
            </Alert>
            <Button
              variant="contained"
              fullWidth
              startIcon={<CancelPresentationIcon />}
              onClick={handleClear}
            >
              CLEAR
            </Button>
          </Stack>
        </Box>
        <Box sx={{ width: "180px" }}>
          <Box
            sx={{
              position: "relative",
              border: "1px dashed black",
              height: "180px",
              width: "180px",
            }}
          >
            {selectedPhoto ? (
              <Box
                component="img"
                src="picturebackground.png"
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Box sx={{ width: "100%", height: "100%", padding: "2px" }}>
                <Box component="img" src="photo-placeholder.png" />
              </Box>
            )}
            {selectedPhoto && (
              <>
                <Box
                  sx={{
                    position: "relative",
                    height: "100%",
                    width: "100%",
                    bgcolor: "#333",
                  }} // Use the preview URL here
                >
                  {isEditingPhoto ? (
                    <>
                      <Button
                        disabled={isProcessing}
                        variant="outlined"
                        size="small"
                        sx={{
                          position: "absolute",
                          bottom: "10px",
                          left: "12px",
                          zIndex: 10,
                          width: "20px",
                          borderColor: "white",
                          backgroundColor: "#ffffff47",
                        }}
                        onClick={handleConfirm}
                      >
                        <CheckIcon sx={{ color: "white" }} />
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        disabled={isProcessing}
                        onClick={handleCancel}
                        sx={{
                          position: "absolute",
                          bottom: "10px",
                          right: "12px",
                          zIndex: 10,
                          width: "20px",
                          borderColor: "white",
                          backgroundColor: "#ffffff47",
                        }}
                      >
                        <CloseIcon sx={{ color: "white" }} />
                      </Button>
                    </>
                  ) : (
                    <>
                      {!hasSaved && (
                        <Button
                          variant="outlined"
                          size="small"
                          sx={{
                            position: "absolute",
                            bottom: "18px",
                            left: "42px",
                            zIndex: 10,
                            borderColor: "white",
                            backgroundColor: "#ffffff47",
                          }}
                          onClick={handleEdit}
                        >
                          <Typography sx={{ color: "white", fontSize: "13px" }}>
                            Edit Photo
                          </Typography>
                        </Button>
                      )}
                    </>
                  )}

                  {isEditingPhoto ? (
                    <Cropper
                      image={preview || ""}
                      crop={crop}
                      zoom={zoom}
                      aspect={ASPECT_RATIO} // Lock aspect ratio (optional)
                      objectFit="horizontal-cover"
                      onCropChange={onCropChange}
                      onZoomChange={onZoomChange}
                      onCropComplete={onCropComplete}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={croppedResult || preview || ""}
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
              </>
            )}
          </Box>

          <Box sx={{ padding: "1px" }}></Box>
          {isEditingPhoto && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "10px" }}>
                Drag to move the photo
              </Typography>
              <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                onChange={(e, val) => setZoom(roundZoom(Number(val)))}
              />
              <Typography sx={{ fontSize: "10px" }}>
                Slide to zoom in or out
              </Typography>
              {!isProcessing ? (
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  fullWidth
                  sx={{
                    marginTop: "5px",
                    height: "36px",
                  }}
                  onClick={handleRemoveBG}
                  disabled={isBackgroundRemoved}
                >
                  <Typography sx={{ fontSize: "11px" }}>
                    Remove Background
                  </Typography>
                </Button>
              ) : (
                <Button
                  fullWidth
                  loading
                  loadingPosition="start"
                  variant="outlined"
                  sx={{
                    marginTop: "5px",
                    height: "36px",
                  }}
                >
                  Removing
                </Button>
              )}
            </Box>
          )}
          {isEditingPhoto && selectedPhoto ? (
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              sx={{
                height: "40px",
                width: "180px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                {selectedPhoto.name.length > 19
                  ? `Filename: ${selectedPhoto.name.slice(0, 18)}` + "..."
                  : `Filename: ${selectedPhoto.name}`}
              </Typography>
            </Box>
          ) : null}
          <Box sx={{ paddingTop: "15px" }}>
            {/* UPLOAD A PHOTO */}
            <Button
              component="label"
              disabled={hasSaved || isProcessing}
              role={undefined}
              variant={`${!selectedPhoto ? "contained" : "outlined"}`}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
              sx={{ height: "36px" }}
            >
              {selectedPhoto ? `Change Photo` : `Upload Photo`}
              <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                onClick={() => setZoom(1)}
                multiple
              />
            </Button>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
}

export default Form;
