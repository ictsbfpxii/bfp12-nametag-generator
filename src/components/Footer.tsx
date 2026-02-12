import { Box, Container, Typography, Link, Stack } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <CodeIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary" align="center">
            Developed by{" "}
            <Link color="inherit" href="#" fontWeight="bold" underline="hover">
              BFP12 Information Technology and Communications Unit
            </Link>
          </Typography>
        </Stack>
        <Typography
          variant="caption"
          display="block"
          align="center"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          © {new Date().getFullYear()} Bureau of Fire Protection Region 12
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
