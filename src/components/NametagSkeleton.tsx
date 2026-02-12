import { Box, Skeleton, Stack } from "@mui/material";

function NametagSkeleton() {
  return (
    <Stack
      direction="column"
      sx={{
        width: "350px",
        height: "500px",
        boxShadow: 3,
        overflow: "hidden",
        borderRadius: "4px", // Optional: matching your card style
      }}
    >
      {/* 1. HEADER SECTION (Red) */}
      <Stack
        direction="row"
        sx={{
          width: "100%",
          height: "102px",
          backgroundColor: "#ec1d25",
          position: "relative",
          alignItems: "center",
          px: 1,
        }}
      >
        <Skeleton
          variant="circular"
          width={52}
          height={52}
          sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
        />

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Skeleton
            variant="text"
            width="80%"
            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
          />
          <Skeleton
            variant="rectangular"
            width="70%"
            height={10}
            sx={{ mt: 1, bgcolor: "rgba(255,255,255,0.2)" }}
          />
        </Box>

        <Skeleton
          variant="circular"
          width={52}
          height={52}
          sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
        />
      </Stack>

      {/* 2. OFFICE BAR (Beige) */}
      <Box
        sx={{
          width: "100%",
          height: "43px",
          backgroundColor: "#f2f2ea",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Skeleton variant="text" width="80%" height={30} />
      </Box>

      {/* 3. QR & PHOTO SECTION (Red) */}
      <Stack
        direction="row"
        sx={{
          backgroundColor: "#ec1d25",
          width: "100%",
          height: "155px",
        }}
      >
        {/* QR Placeholder */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={85}
            height={85}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
            }}
          />
        </Box>

        {/* Photo Placeholder */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={126}
            height={126}
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              borderRadius: "4px",
            }}
          />
        </Box>
      </Stack>

      {/* 4. NAME & NICKNAME SECTION (Beige) */}
      <Stack
        direction="column"
        sx={{
          width: "100%",
          height: "148px",
          backgroundColor: "#f2f2ea",
          position: "relative",
          alignItems: "center",
          pt: 2,
        }}
      >
        <Skeleton variant="text" width="100px" height={20} />{" "}
        {/* Hello Image Placeholder */}
        <Skeleton variant="text" width="70%" height={80} sx={{ mt: -1 }} />{" "}
        {/* Nickname */}
        <Box
          sx={{
            position: "absolute",
            bottom: 5,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton variant="text" width="85%" height={30} /> {/* Full Name */}
        </Box>
        {/* BFP Boy Placeholder */}
        <Skeleton
          variant="circular"
          width={60}
          height={60}
          sx={{ position: "absolute", top: 10, left: 10 }}
        />
      </Stack>

      {/* 5. FOOTER SECTION (Red) */}
      <Box
        sx={{
          width: "100%",
          height: "52px",
          backgroundColor: "#ec1d25",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Skeleton
          variant="text"
          width="90%"
          height={35}
          sx={{ bgcolor: "rgba(255,255,255,0.2)" }}
        />
      </Box>
    </Stack>
  );
}

export default NametagSkeleton;
