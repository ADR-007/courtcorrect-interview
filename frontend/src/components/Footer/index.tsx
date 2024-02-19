import { Divider, Stack, Typography } from '@mui/material';
import React from 'react';

import { colors } from '../../theme';

const Footer = () => (
  <Stack
    direction="column"
    spacing={3}
    alignItems="stretch"
    bgcolor={colors.footerBackground}
    // margin="170px 40px 64p 40px"
    padding="40px 64px 40px 170px"
  >
    <Stack direction="row" spacing={96 / 8} justifyContent="stretch" display="flex">
      <Stack direction="column" spacing={2} flexGrow={1} alignItems="start">
        <img src="logo-with-text.svg" alt="logo" height="32px" />
        <Typography color="secondary" variant="body1">Justice for all.</Typography>
        <Typography color="secondary" variant="body1">
          hello@courtcorrect.com <br />
          33 Percy St, London W1T 2DF <br />
          020 7867 3925
        </Typography>
      </Stack>
      <Stack
        direction="column"
        spacing={1}
      >
        <Typography>Quick Links</Typography>
        <Typography color="secondary" variant="body1">Home</Typography>
        <Typography color="secondary" variant="body1">Data</Typography>
        <Typography color="secondary" variant="body1">Cases</Typography>
        <Typography color="secondary" variant="body1">Customers</Typography>
        <Typography color="secondary" variant="body1">Search Engine</Typography>
        <Typography color="secondary" variant="body1">Custom Fields</Typography>
        <Typography color="secondary" variant="body1">Support</Typography>
      </Stack>
      <Stack
        direction="column"
        spacing={1}
      >
        <Typography>Legals</Typography>
        <Typography color="secondary" variant="body1">Terms & Conditions</Typography>
        <Typography color="secondary" variant="body1">Privacy Policy</Typography>
        <Typography color="secondary" variant="body1">AI Safety Policy</Typography>
        <Typography color="secondary" variant="body1">Cookie Policy</Typography>
        <Typography color="secondary" variant="body1">Compliance Statement</Typography>
      </Stack>
    </Stack>
    <Divider />
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography color="secondary" variant="body1">© 2023 CourtCorrect LTD</Typography>
      <Stack direction="row">
        <img src="icons/icons8-facebook.svg" alt="facebook" height="24px" />
        <img src="icons/icons8-twitter.svg" alt="twitter" height="24px" />
        <img src="icons/icons8-instagram.svg" alt="instagram" height="24px" />
        <img src="icons/icons8-youtube.svg" alt="youtube" height="24px" />
        <img src="icons/icons8-linkedin.svg" alt="linkedin" height="24px" />
        <img src="icons/icons8-tiktok.svg" alt="tiktok" height="24px" />
      </Stack>
    </Stack>
  </Stack>
);

export default Footer;