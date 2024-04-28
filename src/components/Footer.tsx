import { FC } from "react";
import { Box, Typography, Link } from "@mui/material";

const Footer: FC = (): JSX.Element => {
  return (
    <Box
      component="footer"
      sx={{
        textAlign: "center",
        position: "fixed",
        bottom: 0,
        right: 0,
        left: 0,
        color: "white",
        padding: "10px",
        display: {
          xs: "none",
          md: "block"
        },
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} All rights reserved.
      </Typography>
      <Typography variant="body2">
        Developed by{" "}
        <Link
          href="https://www.linkedin.com/in/kenan-maslesa/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "white", textDecoration: "underline" }}
        >
          Kenan Masleša
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
